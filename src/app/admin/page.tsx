"use client";

import EventTable from "../(components)/admin/EventTable";
import AddEventFormModal from "../(components)/admin/AddEventFormModal";
import EditEventFormModal from "../(components)/admin/EditEventFormModal";
import LoadingIcon from "../(components)/LoadingIcon";
import ConfirmationModal from "../(components)/ConfirmationModal";
import useAdmin from "../(hooks)/useAdmin";

export default function AdminPage() {
  const {
    isAdmin,
    loading,
    setShowAddModal,
    showAddModal,
    showEditModal,
    events,
    setEventToEdit,
    setShowEditModal,
    handleDeleteEvent,
    handleAddEvent,
    handleEditEvent,
    eventToEdit,
    showDeleteModal,
    setShowDeleteModal,
    confirmDeleteEvent,
  } = useAdmin();

  if (isAdmin === null || loading) return <LoadingIcon />;

  return (
    <div className="max-w-5xl mx-auto py-8 mt-13">
      <h1 className="text-3xl font-bold mb-6">Admin - Manage Events</h1>
      <button
        className="mb-4 px-4 py-2 bg-primary-blue text-white rounded hover:bg-primary-blue-700"
        onClick={() => setShowAddModal(true)}
      >
        Add Event
      </button>
      <EventTable
        events={events}
        onEdit={(event) => {
          setEventToEdit(event);
          setShowEditModal(true);
        }}
        onDelete={handleDeleteEvent}
      />
      <AddEventFormModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddEvent}
      />
      <EditEventFormModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEventToEdit(null);
        }}
        event={eventToEdit}
        onSave={handleEditEvent}
      />
      <ConfirmationModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        title="Delete Event"
        text="Are you sure you want to delete this event? This action cannot be undone."
        onConfirm={confirmDeleteEvent}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
