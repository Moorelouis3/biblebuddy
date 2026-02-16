"use client";

import { createContext, useContext } from "react";

type FeatureRenderPriorityContextValue = {
  featureToursEnabled: boolean;
};

const FeatureRenderPriorityContext = createContext<FeatureRenderPriorityContextValue>({
  featureToursEnabled: false,
});

export function FeatureRenderPriorityProvider({
  value,
  children,
}: {
  value: FeatureRenderPriorityContextValue;
  children: React.ReactNode;
}) {
  return (
    <FeatureRenderPriorityContext.Provider value={value}>
      {children}
    </FeatureRenderPriorityContext.Provider>
  );
}

export function useFeatureRenderPriority() {
  return useContext(FeatureRenderPriorityContext);
}
