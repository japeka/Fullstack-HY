import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { SignInContainer } from "../../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const handleSubmit = jest.fn();
      const { getByTestId, debug } = render(
        <SignInContainer handleSubmit={handleSubmit} />
      );
      debug();
      await act(async () => {
        await fireEvent.changeText(getByTestId("uname"), "kalle");
      });
      await act(async () => {
        await fireEvent.changeText(getByTestId("pword"), "password");
      });

      await act(async () => {
        await fireEvent.press(getByTestId("fSubmit"));
      });

      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
