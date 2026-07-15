// Troque /raquel.jpg na pasta public/ pela foto real da Raquel
export function Avatar() {
  return (
    <div
      className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden"
      style={{
        boxShadow: '0 2px 8px rgba(176,138,78,0.35)',
        border: '2px solid #D9BE7E',
      }}
    >
      <img
        src="/raquel.jpg"
        alt="Raquel Mendes"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
        }}
      />
    </div>
  )
}
