import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FloatingPanel from "./FloatingPanel";

describe("FloatingPanel", () => {
  it("limits bottom-anchored panels to the viewport above their bottom anchor", () => {
    const { container } = render(
      <FloatingPanel defaultPosition={{ bottom: 120, right: 24 }}>
        <div>Contenido</div>
      </FloatingPanel>,
    );

    const panel = container.querySelector("aside");
    expect(panel).toHaveStyle({
      maxHeight: "calc(100dvh - 136px)",
      maxWidth: "calc(100dvw - 32px)",
    });
  });

  it("can reserve the full available viewport height", () => {
    const { container } = render(
      <FloatingPanel
        defaultPosition={{ bottom: 120, right: 24 }}
        fillAvailableHeight
      >
        <div>Contenido</div>
      </FloatingPanel>,
    );

    const panel = container.querySelector("aside");
    expect(panel).toHaveStyle({
      height: "calc(100dvh - 136px)",
      maxHeight: "calc(100dvh - 136px)",
    });
  });

  it("keeps its measured height when dragged after reserving viewport height", () => {
    const { container } = render(
      <FloatingPanel
        defaultPosition={{ top: 86, right: 24 }}
        fillAvailableHeight
      >
        <div>Contenido</div>
      </FloatingPanel>,
    );
    const panel = container.querySelector("aside");
    const handle = container.querySelector(".panel-divider");

    panel.getBoundingClientRect = () => ({
      left: 600,
      top: 86,
      width: 492,
      height: 480,
      right: 1092,
      bottom: 566,
      x: 600,
      y: 86,
      toJSON: () => {},
    });

    fireEvent.mouseDown(handle, { button: 0, clientX: 620, clientY: 100 });
    fireEvent.mouseMove(window, { clientX: 620, clientY: 160 });
    fireEvent.mouseUp(window);

    expect(panel).toHaveStyle({
      height: "480px",
      top: "146px",
    });
  });

  it("resizes from the bottom-right corner without content changes", () => {
    const { container } = render(
      <FloatingPanel
        defaultPosition={{ top: 86, right: 24 }}
        fillAvailableHeight
        resizable
      >
        <div>Contenido</div>
      </FloatingPanel>,
    );
    const panel = container.querySelector("aside");
    const resizeHandle = container.querySelector(
      'button[aria-label="Redimensionar panel"]',
    );

    panel.getBoundingClientRect = () => ({
      left: 300,
      top: 86,
      width: 492,
      height: 480,
      right: 792,
      bottom: 566,
      x: 300,
      y: 86,
      toJSON: () => {},
    });

    fireEvent.mouseDown(resizeHandle, {
      button: 0,
      clientX: 792,
      clientY: 566,
    });
    fireEvent.mouseMove(window, { clientX: 832, clientY: 626 });
    fireEvent.mouseUp(window);

    expect(panel).toHaveStyle({
      height: "540px",
      width: "532px",
    });
  });

  it("clamps dragged panels so their top stays inside the viewport", () => {
    const { container } = render(
      <FloatingPanel defaultPosition={{ bottom: 120, right: 24 }}>
        <div>Contenido</div>
      </FloatingPanel>,
    );
    const panel = container.querySelector("aside");
    const handle = container.querySelector(".panel-divider");

    panel.getBoundingClientRect = () => ({
      left: 40,
      top: 40,
      width: 300,
      height: 200,
      right: 340,
      bottom: 240,
      x: 40,
      y: 40,
      toJSON: () => {},
    });

    fireEvent.mouseDown(handle, { button: 0, clientX: 50, clientY: 50 });
    fireEvent.mouseMove(window, { clientX: 50, clientY: -200 });
    fireEvent.mouseUp(window);

    expect(panel).toHaveStyle({
      top: "16px",
      maxHeight: "calc(100dvh - 32px)",
    });
  });
});
