import { useState, useEffect, useCallback } from 'react';
import './Header.css';

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

interface PromptModalProps {
  onClose: () => void;
}

function PromptModal({ onClose }: PromptModalProps) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('prompts/prompt.txt')
      .then((res) => {
        if (!res.ok) throw new Error('ファイルが見つかりません: /prompts/prompt.txt');
        return res.text();
      })
      .then((t) => {
        setText(t);
        setLoading(false);
      })
      .catch((e: Error) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="AIにコードの仕組みを聞いてみる"
      >
        <div className="modal-header">
          <span className="modal-title-text">GeminiやChatGPTにこのプロンプトを貼り付けると、AIがコードをやさしく解説してくれます！</span>
          <div className="modal-actions">
            <button
              className={`btn-copy ${copied ? 'btn-copy--done' : ''}`}
              onClick={handleCopy}
              disabled={loading || !!error}
              title="クリップボードにコピー"
            >
              {copied ? <><CheckIcon /> コピー済み</> : <><CopyIcon /> コピー</>}
            </button>
            <button className="btn-close" onClick={onClose} title="閉じる">
              <CloseIcon />
            </button>
          </div>
        </div>

        <div className="modal-body">
          {loading && <div className="modal-status">読み込み中...</div>}
          {error && <div className="modal-status modal-error">⚠ {error}</div>}
          {!loading && !error && <pre className="modal-pre">{text}</pre>}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const close = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <div className="header-brand">
            <div className="header-logo-mark">
              <span className="logo-dot logo-dot--1"></span>
              <span className="logo-dot logo-dot--2"></span>
              <span className="logo-dot logo-dot--3"></span>
              <span className="logo-dot logo-dot--4"></span>
            </div>
            <div className="header-title-block">
              <h1 className="header-title">Game AI Gallery</h1>
              <p className="header-subtitle">for Learning</p>
            </div>
          </div>

          <nav className="header-nav">
            <button
              className="btn-prompt"
              onClick={() => setModalOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              AIにコードの仕組みを聞いてみる
            </button>
          </nav>
        </div>
      </header>

      {modalOpen && <PromptModal onClose={close} />}
    </>
  );
}
