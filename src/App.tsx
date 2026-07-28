import { ChatFunnel } from './components/ChatFunnel'

export default function App() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 8px 40px',
      }}
    >
      <header style={{ textAlign: 'center', padding: '20px 16px 12px', width: '100%' }}>
        <p
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(10px, 2.5vw, 12px)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#F5EFE6',
            margin: 0,
            opacity: 0.9,
          }}
        >
          Raquel Mendes · Prosperidade Financeira
        </p>
      </header>

      <main
        style={{
          width: '100%',
          maxWidth: '520px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '20px',
            background: 'rgba(255,245,230,0.14)',
            border: '1px solid rgba(184,137,75,0.35)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
            overflow: 'hidden',
          }}
        >
          <ChatFunnel />
        </div>
      </main>
    </div>
  )
}
