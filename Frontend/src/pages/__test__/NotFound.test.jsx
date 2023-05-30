import {render, screen} from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NotFound from '../NotFound'

describe('NotFound', () => {
    it('renders only ONE heading on NotFound page', async () => {
        render(<NotFound />)
        const headingElement = screen.getByRole('heading')
        expect(headingElement).toBeInTheDocument();
    })
    it('renders a heading with text: 404 Not Found', async () => {
        render(<NotFound title="404 Not Found"/>)
        const headingElement = screen.getByText('404 Not Found')
        expect(headingElement).toBeInTheDocument();
    })
}) 