"use client";
import React from "react";
import styled from "styled-components";

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
      />
    );
  }
);

export default Textarea;
