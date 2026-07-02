import { useRef } from "react";
import "./TiltedCard.css";

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  imageHeight = "300px",
  imageWidth = "100%",
  rotateAmplitude = 10,
  scaleOnHover = 1.04,
  overlayContent = null,
  displayOverlayContent = false,
}) {
  const innerRef = useRef(null);

  function handleMouseMove(event) {
    const card = innerRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height - 0.5) * -rotateAmplitude).toFixed(2);
    const rotateY = ((x / rect.width - 0.5) * rotateAmplitude).toFixed(2);

    card.style.setProperty("--tilt-rotate-x", `${rotateX}deg`);
    card.style.setProperty("--tilt-rotate-y", `${rotateY}deg`);
    card.style.setProperty("--tilt-scale", scaleOnHover);
  }

  function handleMouseLeave() {
    const card = innerRef.current;
    if (!card) return;

    card.style.setProperty("--tilt-rotate-x", "0deg");
    card.style.setProperty("--tilt-rotate-y", "0deg");
    card.style.setProperty("--tilt-scale", "1");
  }

  return (
    <figure className="tilted-card-figure" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div
        ref={innerRef}
        className="tilted-card-inner"
        style={{ width: imageWidth, height: imageHeight }}
      >
        <img src={imageSrc} alt={altText} className="tilted-card-img" loading="lazy" decoding="async" />
        {displayOverlayContent && overlayContent && <div className="tilted-card-overlay">{overlayContent}</div>}
      </div>
    </figure>
  );
}
