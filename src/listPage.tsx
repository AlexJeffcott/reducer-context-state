import React, { ChangeEvent, FC, useState, KeyboardEvent } from "react";
import styled from "@emotion/styled";
import { useListReducer } from "./listState";
import type { ToolbarProps, ItemsProps } from "./types";

const Row = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  "& > *": {
    margin: "0.3rem"
  }
});

const Toolbar: FC<ToolbarProps> = ({ addItem }) => {
  const [input, setInput] = useState("");

  const handleButtonClick = () => {
    setInput("");
    addItem({
      id: Date.now().toString(),
      title: input,
      status: false
    });
  };

  return (
    <Row>
      <input
        type="text"
        value={input}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInput(e.currentTarget.value)
        }
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (
            e.keyCode === 13 ||
            e.code === "Enter" ||
            e.code === "NumpadEnter"
          ) {
            handleButtonClick();
          }
        }}
      />
      <button onClick={handleButtonClick} disabled={!input.length}>
        Add item
      </button>
    </Row>
  );
};

const Items: FC<ItemsProps> = ({ items, removeItem }) => {
  return (
    <div>
      {items.length ? (
        items.map((listItem) => (
          <Row key={listItem.id}>
            <h3>{listItem.title}</h3>
            <button
              onClick={() => {
                removeItem(listItem.id);
              }}
            >
              🗑
            </button>
          </Row>
        ))
      ) : (
        <div>Your shopping list is empty.</div>
      )}
    </div>
  );
};

export const ListPage: FC = () => {
  const [{ items }, { addItem, removeItem }] = useListReducer();

  return (
    <div>
      <Toolbar addItem={addItem} />
      <Items items={items} removeItem={removeItem} />
    </div>
  );
};

export default ListPage;
