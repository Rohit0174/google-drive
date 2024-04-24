import { Breadcrumb } from "antd";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BreadCrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  useEffect(() => {
    const pathParts = pathname.split("/").filter((part) => part !== "");

    const items = [
      {
        title: "Home",
        href: "/",
      },
    ];

    let currentPath = "/"; // Initialize currentPath with a slash
    pathParts.forEach((part, index) => {
      const isLastPart = index === pathParts.length - 1;
      if (part) {
        currentPath += `${isLastPart ? part : part + "/"}`;
        items.push({
          title: decodeURIComponent(part),
          href: currentPath,
        });
      }
    });

    setBreadcrumbItems(items);
  }, [pathname]);

  const handleClick = (href) => {
    navigate(href);
  };

  return (
    <Breadcrumb>
      {breadcrumbItems.map((item, index) => (
        <Breadcrumb.Item key={index}>
          {item.href ? (
            <span
              className="cursor_pointer"
              onClick={() => handleClick(item.href)}
            >
              {item.title}
            </span>
          ) : (
            <span className="cursor_pointer">{item.title}</span>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadCrumb;
