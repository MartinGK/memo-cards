"use client";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  CARD_TEXTAREA_MAX_CHARACTERS,
  TIME_TO_SHOW_PRESS_ENTER_MESSAGE,
} from "../utils/constants";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const StyledTextarea = styled.textarea`
  background-color: transparent;
  max-width: 100%;
  max-height: 189px;
  border: none;
  resize: none;
  font-size: 2rem;
  color: black;
  outline: none;
  overflow: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0px;
  }

  &:focus {
    border: none;
  }

  &:focus-visible {
    border: none;
  }
`;

const Textarea = React.forwardRef(
  (props: TextareaProps, ref?: React.ForwardedRef<HTMLTextAreaElement>) => {
    const [maxHeightForTextarea, setMaxHeightForTextarea] = useState(0);
    const [showPressStartMessage, setShowPressStartMessage] = useState(false);
    const pressStartMessageRef = useRef<NodeJS.Timeout | null>(null);

    const setTimerToShowPressEnterMessage = () => {
      setShowPressStartMessage(false);
      pressStartMessageRef.current = setTimeout(() => {
        setShowPressStartMessage(true);
      }, TIME_TO_SHOW_PRESS_ENTER_MESSAGE);
    };

    const adjustHeightAndLimitMaxCharacters = (
      event: React.FormEvent<HTMLTextAreaElement>
    ) => {
      const textarea = event.currentTarget;
      adjustTextareaHeight(textarea);
      limitMaxTextareaCharacters(textarea);
    };

    const limitMaxTextareaCharacters = (textarea: HTMLTextAreaElement) => {
      if (textarea.value.length > CARD_TEXTAREA_MAX_CHARACTERS) {
        textarea.value = textarea.value.slice(0, -1);
      }
    };

    const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
      textarea.style.height = "auto";
      if (maxHeightForTextarea > textarea.scrollHeight) {
        textarea.style.height = `${maxHeightForTextarea}px`;
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
      adjustHeightAndLimitMaxCharacters(event);
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
      <StyledTextarea
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
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
