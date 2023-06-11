import { useState } from "react";

/**
 * Custom React hook for managing the state of a modal.
 * Provides functions to open and close the modal and a boolean value indicating if the modal is open.
 * @returns {object} - Object containing the state and functions for the modal.
 */
const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const openModal = () => {
        setIsOpen(true);
    };
    
    const closeModal = () => {
        setIsOpen(false);
    };

    return {
        isOpen,
        openModal,
        closeModal,
    };
};

export default useModal;
