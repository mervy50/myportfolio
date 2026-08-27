// @vitest-environment jsdom
import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import WelcomeIntro from "./components/WelcomeIntro";


describe("WelcomeIntro", () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("assemble le message central et se termine après quelques secondes", () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    render(<WelcomeIntro onComplete={onComplete} />);

    expect(screen.getByRole("dialog", { name: "Introduction du portfolio" })).toBeTruthy();
    expect(screen.getByLabelText("Welcome to my Portfolio Website")).toBeTruthy();
    expect(screen.getByText("Welcome to my")).toBeTruthy();
    expect(screen.getByText("Portfolio Website")).toBeTruthy();

    act(() => vi.advanceTimersByTime(4599));
    expect(onComplete).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(801));
    expect(onComplete).toHaveBeenCalledOnce();
  });

  it("permet de passer l’introduction au clavier ou au clic", () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    render(<WelcomeIntro onComplete={onComplete} />);
    fireEvent.click(screen.getByRole("button", { name: "Passer l’introduction" }));

    expect(screen.getByRole("dialog", { name: "Introduction du portfolio" }).className).toContain("is-closing");
    act(() => vi.advanceTimersByTime(180));
    expect(onComplete).toHaveBeenCalledOnce();
  });
});
