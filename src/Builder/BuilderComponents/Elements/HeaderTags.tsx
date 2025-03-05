import React, { JSX } from "react";

interface props {
  content: string;
  className: string;
  as: keyof JSX.IntrinsicElements;
}

const HeaderTags = (props: props) => {
  return <props.as className={props.className}>{props.content}</props.as>;
};

export default HeaderTags;
