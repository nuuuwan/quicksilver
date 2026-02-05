import React from "react";
import AppLayout from "../moles/AppLayout";
import ThreadList from "../moles/ThreadList";
import { useData } from "../../nonview/core/DataContext";

function DraftsPage() {
  const { drafts, loading } = useData();

  return (
    <AppLayout title="Drafts">
      <ThreadList threads={drafts} loading={loading} emptyMessage="No drafts" />
    </AppLayout>
  );
}

export default DraftsPage;
