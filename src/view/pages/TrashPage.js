import React from "react";
import AppLayout from "../moles/AppLayout";
import ThreadList from "../moles/ThreadList";
import { useData } from "../../nonview/core/DataContext";

function TrashPage() {
  const { trashedThreads, loading } = useData();

  return (
    <AppLayout title="Trash">
      <ThreadList
        threads={trashedThreads}
        loading={loading}
        emptyMessage="Trash is empty"
      />
    </AppLayout>
  );
}

export default TrashPage;
