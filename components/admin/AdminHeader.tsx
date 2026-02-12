"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import ChangePasswordModal from "./ChangePasswordModal";

export default function AdminHeader() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <>
      <div className="flex items-center justify-end gap-2 mb-8">
        <button
          onClick={() => setShowPasswordModal(true)}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-brand-accent dark:bg-brand-primary hover:bg-brand-light dark:hover:bg-brand-primary-dark text-brand-dark dark:text-white font-medium rounded-lg transition-colors"
          title="Cambiar contraseña"
        >
          <FontAwesomeIcon icon={faKey} size="sm" />
          Cambiar Contraseña
        </button>
      </div>

      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </>
  );
}
