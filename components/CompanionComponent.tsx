"use client";
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { CompanionComponentProps, SavedMessage } from "@/types";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import soundwaves from "@/constants/soundwaves.json";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}
const CompanionComponent = ({
  // companionId,
  subject,
  topic,
  name,
  userName,
  userImage,
  voice,
  style,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const lottieRef = React.useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        console.log(newMessage);
        setMessages((prev) => [newMessage, ...prev]);
        setIsSpeaking(false);
      }
    };
    // const onError = (error: Error) => console.log("Error", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, []);

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    const assistantOverrides = {
      variableValues: {
        subject,
        topic,
        style,
      },
      clientMessages: ["transcript"],
      serverMessages: [],
    };
    // @ts-expect-error vapi.start may not have correct type definitions for these arguments
    vapi.start(configureAssistant(voice, style), assistantOverrides);
  };

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  console.log("messages", messages);
  return (
    <section className="flex flex-col h-[70vh]">
      <section className="flex gap-8 max-sm:flex-col">
        <div className="companion-section">
          <div
            className="companion-avatar"
            style={{ background: getSubjectColor(subject) }}>
            {" "}
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.FINISHED ||
                  callStatus === CallStatus.INACTIVE
                  ? "opacity-0"
                  : "opacity-100",
                callStatus === CallStatus.CONNECTING &&
                  "opacity-100 animate-pulse"
              )}>
              <Image
                src={`/icons/${subject}.svg`}
                alt="subject"
                width={50}
                height={50}
              />
            </div>
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
              )}>
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoPlay={false}
                className="companion-lottie"
              />
            </div>
          </div>
          <p className="font-bold text-2xl">{name}</p>
        </div>
        <div className="user-section">
          <div className="user-avatar">
            <Image src={userImage} alt="user" width={130} height={130} />
            <p className="font-bold text-2xl ">{userName}</p>
            <button
              className="btn-mic"
              onClick={toggleMicrophone}
              disabled={callStatus !== CallStatus.ACTIVE}>
              <Image
                src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
                alt="mic"
                width={36}
                height={36}
              />
              <p className="max-sm:hidden">{isMuted ? "Unmute" : "Mute"}</p>
            </button>
            <button
              className={cn(
                "rounded-lg py-2 cursor-pointer transition-colors w-full text-white",
                callStatus === CallStatus.ACTIVE ? "bg-red-700" : "bg-primary",
                callStatus === CallStatus.CONNECTING && "animate-pulse"
              )}
              onClick={
                callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
              }>
              {callStatus === CallStatus.ACTIVE
                ? "End Call"
                : callStatus === CallStatus.CONNECTING
                ? "Connecting..."
                : "Start Call"}
            </button>
          </div>
        </div>
      </section>
      <section className="transcript">
        <div className="transcript-message no-scrollbar">
          {messages.map((renderMessage) => {
            if (renderMessage.role === "assistant") {
              return (
                <p key={renderMessage.content} className="max-sm:text-sm">
                  {renderMessage.role.split(" ")[0].replace("/[.,]/g", "")} :{" "}
                  {renderMessage.content}
                </p>
              );
            } else {
              return (
                <p
                  key={renderMessage.content}
                  className="text-primary max-sm:text-sm">
                  {userName} : {renderMessage.content}
                </p>
              );
            }
          })}
        </div>
        <div className="transcript-fade" />
      </section>
    </section>
  );
};

export default CompanionComponent;
