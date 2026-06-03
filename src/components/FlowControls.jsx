"use client";

import { ControlButton, Panel, useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import ResetViewIcon from "./icons/ResetViewIcon";
import ZoomInIcon from "./icons/ZoomInIcon";
import ZoomOutIcon from "./icons/ZoomOutIcon";
import { Tooltip } from "./ui/Tooltip";

const FIT_VIEW_MAX_ZOOM = 1;

export default function FlowControls({ initialX }) {
  const { zoomIn, zoomOut, setViewport, getNodes } = useReactFlow();
  const { t } = useTranslation();

  const handleFitView = useCallback(() => {
    const nodes = getNodes();
    if (nodes.length === 0) return;

    const minY = Math.min(...nodes.map((n) => n.position.y));
    const maxY = Math.max(
      ...nodes.map(
        (n) => n.position.y + (n.measured?.height ?? n.height ?? 40),
      ),
    );
    const nodesHeight = maxY - minY;
    const centerY = (minY + maxY) / 2;

    const viewH = window.innerHeight;
    const zoom = Math.min(
      FIT_VIEW_MAX_ZOOM,
      Math.max(0.2, (viewH * 0.8) / nodesHeight),
    );

    setViewport(
      { x: initialX, y: viewH / 2 - centerY * zoom, zoom },
      { duration: 300 },
    );
  }, [getNodes, setViewport, initialX]);

  return (
    <Panel position="bottom-left">
      <div className="react-flow__controls">
        <Tooltip content={t("controls.zoom_in")} side="right">
          <ControlButton
            onClick={() => zoomIn({ duration: 300 })}
            aria-label={t("controls.zoom_in")}
          >
            <ZoomInIcon />
          </ControlButton>
        </Tooltip>
        <Tooltip content={t("controls.zoom_out")} side="right">
          <ControlButton
            onClick={() => zoomOut({ duration: 300 })}
            aria-label={t("controls.zoom_out")}
          >
            <ZoomOutIcon />
          </ControlButton>
        </Tooltip>
        <Tooltip content={t("controls.reset_view")} side="right">
          <ControlButton
            onClick={handleFitView}
            aria-label={t("controls.reset_view")}
          >
            <ResetViewIcon />
          </ControlButton>
        </Tooltip>
      </div>
    </Panel>
  );
}
