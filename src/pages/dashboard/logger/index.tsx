import { useNavigate } from "react-router-dom";

export default function Logger() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        logger
      </button>
    </div>
  );
}
