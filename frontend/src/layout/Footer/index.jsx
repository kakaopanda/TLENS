import React from "react";
import SimpleReactFooter from "simple-react-footer";

const Footer = () => {
  const footerData = {
    description: "Your description here",
    title:
      "Your title hereour title hereour tititle hereour title hereour title hereour title here",
    columns: [
      {
        title: "Resources",
        resources: [
          {
            name: "Resource 1",
            link: "/resource1",
          },
          {
            name: "Resource 2",
            link: "/resource2",
          },
          {
            name: "Resource 3",
            link: "/resource3",
          },
        ],
      },
      {
        title: "Legal",
        resources: [
          {
            name: "Privacy Policy",
            link: "/privacy",
          },
          {
            name: "Terms of Use",
            link: "/terms",
          },
        ],
      },
      {
        title: "Contact",
        resources: [
          {
            name: "Email",
            link: "mailto:your.email@example.com",
          },
          {
            name: "Twitter",
            link: "https://twitter.com/yourhandle",
          },
        ],
      },
    ],
    backgroundColor: "#015cad",
    textColor: "#fff",
    fontColor: "#fff",
  };
  return (
    <div>
      <SimpleReactFooter {...footerData} />
    </div>
  );
};

export default Footer;
