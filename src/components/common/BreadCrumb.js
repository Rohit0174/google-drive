import { Breadcrumb } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const BreadCrumb = () => {
  const location = useLocation();
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

    let currentPath = "/";
    pathParts.forEach((part, index) => {
      // For the last part, exclude the trailing slash
      const isLastPart = index === pathParts.length - 1;
      currentPath += `${part}${isLastPart ? "" : "/"}`;
      items.push({
        title: decodeURIComponent(part),
        href: currentPath,
      });
    });

    setBreadcrumbItems(items);
  }, [pathname]);

  return (
    <Breadcrumb>
      {breadcrumbItems.map((item, index) => (
        <Breadcrumb.Item key={index}>
          {item.href ? <Link to={item.href}>{item.title}</Link> : item.title}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadCrumb;
