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
          className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-[#E2E7E3] dark:bg-[#455C47] hover:bg-[#CAD3CB] dark:hover:bg-[#3F5C43] text-[#2E2E2E] dark:text-[#FFFFFF] font-medium rounded-lg transition-colors"
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
