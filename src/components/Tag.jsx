function Tag({ label, col }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 9px",
        borderRadius: 20,
        fontSize: 10,
        fontWeight: 600,
        background: `${col}1a`,
        color: col,
        border: `1px solid ${col}33`,
      }}
    >
      {label}
    </span>
  );
}

export default Tag;
