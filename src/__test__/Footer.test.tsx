import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';
import { Footer } from '@/components/UI/Footer';

describe('<Footer />', () => {
  test('Footer mounts properly', () => {
    const wrapper = render(<Footer />);
    expect(wrapper).toBeTruthy();
  });

  test('Footer have 6 anchor elements', () => {
    const wrapper = render(<Footer />);
    const githubLinks = wrapper.container.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
    expect(githubLinks.length).toBe(6);
  });

  test('link to github of user fasty86 exist ', () => {
    render(<Footer />);
    const link = screen.getByText(/fasty86/i);
    expect(link).toHaveAttribute('href', 'https://github.com/fasty86');
  });

  test('link to gitgub exist for all team members ', () => {
    render(<Footer />);
    const links = screen.getAllByTestId('GitHubIcon');
    expect(links.length).toBe(3);
  });

  test('link to location exist in footer ', () => {
    render(<Footer />);
    const location = screen.getByText(/Los Angeles/i);
    expect(location).toBeInTheDocument();
  });
});
