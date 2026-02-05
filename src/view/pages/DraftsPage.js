import React from "react";
import DraftsIcon from "@mui/icons-material/Drafts";
import AppLayout from "../moles/AppLayout";
import ThreadList from "../moles/ThreadList";
import { useData } from "../../nonview/core/DataContext";

function DraftsPage() {
  const { drafts, loading } = useData();

  return (
    <AppLayout title="Drafts" titleIcon={DraftsIcon}>
      <ThreadList threads={drafts} loading={loading} emptyMessage="No drafts" />
    </AppLayout>
  );
}

export default DraftsPage;
