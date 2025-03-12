import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error) {
        console.error("Error caught in ErrorBoundary:", error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <h1 style={{ color: 'white' }}>
                    Something went wrong. Please try again or contact support if the issue persists.
                </h1>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
