import React, { useMemo, useState } from "react";
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Input from "../atoms/Input";
import RecipientChip from "../atoms/RecipientChip";

const RecipientInput = ({ value = [], onChange, suggestions = [] }) => {
  const [inputValue, setInputValue] = useState("");

  const filteredSuggestions = useMemo(() => {
    if (!inputValue) return [];
    const query = inputValue.toLowerCase();
    return suggestions.filter(
      (s) =>
        s.email.toLowerCase().includes(query) ||
        (s.name && s.name.toLowerCase().includes(query)),
    );
  }, [inputValue, suggestions]);

  const handleAddRecipient = (recipient) => {
    if (!recipient?.email) return;
    const exists = value.some((r) => r.email === recipient.email);
    if (!exists) {
      onChange([...value, recipient]);
    }
    setInputValue("");
  };

  const handleRemove = (email) => {
    onChange(value.filter((r) => r.email !== email));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      handleAddRecipient({ email: inputValue.trim() });
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
        To
      </Typography>
      <Paper
        variant="outlined"
        sx={{ p: 1, display: "flex", flexWrap: "wrap", alignItems: "center" }}
      >
        {value.map((recipient) => (
          <RecipientChip
            key={recipient.email}
            email={recipient.email}
            name={recipient.name}
            onRemove={() => handleRemove(recipient.email)}
          />
        ))}
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add recipient"
          onKeyDown={handleKeyDown}
          sx={{ flex: 1, minWidth: 200 }}
        />
      </Paper>

      {filteredSuggestions.length > 0 && (
        <Paper
          sx={{
            position: "absolute",
            zIndex: 10,
            width: "100%",
            mt: 0.5,
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          <List dense>
            {filteredSuggestions.map((suggestion) => (
              <ListItem
                key={suggestion.id}
                button
                onClick={() => handleAddRecipient(suggestion)}
              >
                <ListItemText
                  primary={suggestion.name || suggestion.email}
                  secondary={suggestion.email}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default RecipientInput;
