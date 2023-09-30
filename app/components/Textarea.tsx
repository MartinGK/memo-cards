"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  CARD_TEXTAREA_MAX_CHARACTERS,
  PRESS_ENTER_MESSAGE,
  TIME_TO_SHOW_PRESS_ENTER_MESSAGE,
} from "../utils/constants";
import Tooltip from "./Tooltip";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef(
  (props: TextareaProps, ref?: React.ForwardedRef<HTMLTextAreaElement>) => {
    const [showPressStartMessage, setShowPressStartMessage] = useState(false);
    const pressStartMessageRef = useRef<NodeJS.Timeout | null>(null);

    const setTimerToShowPressEnterMessage = () => {
      setShowPressStartMessage(false);
      pressStartMessageRef.current = setTimeout(() => {
        setShowPressStartMessage(true);
      }, TIME_TO_SHOW_PRESS_ENTER_MESSAGE);
    };

    const limitMaxCharacters = (
      event: React.FormEvent<HTMLTextAreaElement>
    ) => {
      const textarea = event.currentTarget;
      limitMaxTextareaCharacters(textarea);
    };

    const limitMaxTextareaCharacters = (textarea: HTMLTextAreaElement) => {
      if (textarea.value.length > CARD_TEXTAREA_MAX_CHARACTERS) {
        textarea.value = textarea.value.slice(0, -1);
      }
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter") {
        setShowPressStartMessage(false);
      } else {
        setTimerToShowPressEnterMessage();
      }
      if (props.onKeyDown) props.onKeyDown(event);
    };

    const locateCaretAtTheEnd = (
      event: React.FocusEvent<HTMLTextAreaElement>
    ) => {
      const len = event.target.value.length;
      event.target.selectionStart = len;
      event.target.selectionEnd = len;
    };

    const onInput = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      limitMaxCharacters(event);
      if (props.onFocus) props.onFocus(event);
    };

    const onFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      locateCaretAtTheEnd(event);
      if (props.onFocus) props.onFocus(event);
    };

    useEffect(() => {
      return () => {
        if (pressStartMessageRef.current) {
          clearTimeout(pressStartMessageRef.current);
        }
      };
    }, []);

    return (
      <>
        {/* <Tooltip message={PRESS_ENTER_MESSAGE} isOpen={showPressStartMessage} /> */}
        <textarea
          className="bg-transparent max-w-full max-h-full border-none resize-none text-3xl text-black outline-none overflow-hidden no-scrollbar focus:border-none focus-visible:border-none"
          ref={ref}
          role="input"
          rows={5}
          wrap="hard"
          maxLength={90}
          autoFocus
          aria-label="textarea"
          {...props}
          onFocus={onFocus}
          onInput={onInput}
          onKeyDown={onKeyDown}
        />
      </>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
