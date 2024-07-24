import React from 'react';
import { fireEvent, getByLabelText, render, screen } from '@testing-library/react';
import App from './App';
import axios, { AxiosResponse } from 'axios';
import '@testing-library/jest-dom'
import { wait } from '@testing-library/user-event/dist/utils';

test('renders App component', () => {
    render(<App />);
    const header = screen.getByText("Calculate Sleep Score");
    expect(header).toBeInTheDocument();
    expect(screen.getByText("Duration in bed:")).toBeInTheDocument();
    expect(screen.getByText("Duration asleep:")).toBeInTheDocument();
});

test('the calculate button is disabled initially', () => {
    render(<App />);
    const calculateButton = screen.getByText("Calculate");
    expect(calculateButton).toBeInTheDocument();
    expect(calculateButton).toHaveAttribute('disabled');
});

test('renders HoursDropdown component', () => {
    render(<App />);
    const dropdowns = screen.getAllByRole("combobox");
    expect(dropdowns.length).toBe(2);
});

test('renders sleep score message after clicking calculate button', async () => {
    const mAxiosResponse = {
        data: { success: true },
      } as AxiosResponse;
    jest.spyOn(axios, 'post').mockResolvedValueOnce(mAxiosResponse);
    render(<App />);

    const calculateButton = screen.getByText("Calculate").closest('button');
    const durationInBed = screen.getByTestId('durationInBed') as HTMLSelectElement;
    const durationAsleep = screen.getByTestId('durationAsleep') as HTMLSelectElement;;
    fireEvent.change(durationInBed, { target: { value: '120' } });
    fireEvent.change(durationAsleep, { target: { value: '60' } });
    expect(calculateButton).not.toBeDisabled();

    calculateButton!.click();
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    wait(1000);
    expect(await screen.findByText("Sleep score: 50")).toBeInTheDocument();
});

test('renders renders an error message if API call is not successful', async () => {
    const mAxiosResponse = {
        data: { success: false },
      } as AxiosResponse;
    jest.spyOn(axios, 'post').mockResolvedValueOnce(mAxiosResponse);
    render(<App />);

    const calculateButton = screen.getByText("Calculate").closest('button');
    const durationInBed = screen.getByTestId('durationInBed') as HTMLSelectElement;
    const durationAsleep = screen.getByTestId('durationAsleep') as HTMLSelectElement;;
    fireEvent.change(durationInBed, { target: { value: '120' } });
    fireEvent.change(durationAsleep, { target: { value: '60' } });
    expect(calculateButton).not.toBeDisabled();

    calculateButton!.click();
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    wait(1000);
    expect(await screen.findByText("Something went wrong")).toBeInTheDocument();
});