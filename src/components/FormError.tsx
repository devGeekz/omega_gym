type Props = {
  text: string | null | undefined;
};

export default function FormError({ text }: Props) {
  return (
    <>
      {text && (
        <p
          className={`${
            text.toLowerCase().includes("success")
              ? "text-green-600"
              : "text-red-600"
          } text-xs mt-1`}
        >
          {text}
        </p>
      )}
    </>
  );
}
