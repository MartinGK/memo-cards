/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header component', () => {
  beforeEach(() => {
    render(<Header />);
  });

  it('should exists a header', () => {
    const header = screen.getByRole('header');
    expect(header).toBeInTheDocument();
  });

  it('should exists a navigator', () => {
    const navigator = screen.getByRole('navigator');
    expect(navigator).toBeInTheDocument();
  });

  it('should have a Welcome message', () => {
    const Welcome = screen.getByText('Welcome');
    expect(Welcome).toBeInTheDocument();
  });
});
