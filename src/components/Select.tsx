import React, { useEffect, useRef, useState } from "react";
import styles from "./../css/select.module.css";
export type SelectOption = {
  label: string;
  value: string | number;
};

type SingleSelectProps = {
  multiple: false;
  value?: SelectOption | undefined;
  onChange: (value: SelectOption | undefined) => void;
};

type MultipleSelectProps = {
  multiple: true;
  value?: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

const Select = ({ multiple, options, value, onChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const clearOptions = () => {
    multiple ? onChange([]) : onChange(undefined);
  };
  const selectOption = (option: SelectOption) => {
    if (multiple) {
      if (value?.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  };
  const isOptionSelected = (option: SelectOption) => {
    return multiple ? value?.includes(option) : option === value;
  };
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return;
      switch (e.code) {
        case "Enter":
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown":
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        case "Escape":
          setIsOpen(false);
          break;
      }
    };
    if (containerRef.current)
      containerRef.current.addEventListener("keydown", handler);
    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, options]);
  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onBlur={() => {
        setIsOpen(false);
      }}
      onClick={() => {
        setIsOpen((prevValue) => !prevValue);
      }}
      className={styles.container}
    >
      <span className={styles.value}>
        {multiple
          ? value?.map((v) => (
              <button
                key={v.value}
                className={styles["option-badge"]}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(v);
                }}
              >
                {v.label}
                <span className={styles["remove-btn"]}>&times;</span>
              </button>
            ))
          : value?.label}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className={styles["close-btn"]}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <li
            onMouseEnter={() => {
              setHighlightedIndex(index);
            }}
            onMouseLeave={() => {
              setHighlightedIndex(-1);
            }}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            key={option.value}
            className={`${styles.option} ${
              isOptionSelected(option) ? styles.selected : ""
            } ${index === highlightedIndex ? styles.highlighted : ""}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
