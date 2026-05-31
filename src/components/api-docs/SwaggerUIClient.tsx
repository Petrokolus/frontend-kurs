"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { spec } from "@/lib/openapi";

export function SwaggerUIClient() {
  return (
    <SwaggerUI
      spec={spec}
      tryItOutEnabled={true}
      displayRequestDuration={true}
    />
  );
}
