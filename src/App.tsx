import './App.css';

interface AppConfig {
  id: string;
  name: string;
  url: string;
  githubUrl: string;
  sourceUrl: string;
  zoom: number;
}

const apps: AppConfig[] = [
  {
    id: 'quoridor',
    name: 'Quoridor',
    url: 'https://quoridor-app.pecode.com/',
    githubUrl: 'https://github.com/toyohisa2nakada/quoridor-app',
    sourceUrl: 'https://github.com/toyohisa2nakada/quoridor-app/blob/main/src/game/quoridor_ai.ts',
    zoom: 0.66,
  },
  {
    id: 'sniper',
    name: 'Sniper',
    url: 'https://sniper-app.pecode.com/',
    githubUrl: 'https://github.com/toyohisa2nakada/sniper-app',
    sourceUrl: 'https://github.com/toyohisa2nakada/sniper-app/blob/main/src/extentions/agent.ts',
    zoom: 0.55,
  },
  {
    id: 'algo',
    name: 'Algo',
    url: 'https://algo-app.pecode.com/',
    githubUrl: 'https://github.com/toyohisa2nakada/algo-app',
    sourceUrl: 'https://github.com/toyohisa2nakada/algo-app/blob/main/algo-ai.ts',
    zoom: 0.70,
  },
  {
    id: 'gomoku',
    name: 'Gomoku',
    url: 'https://gomoku-app.pecode.com/',
    githubUrl: 'https://github.com/toyohisa2nakada/gomoku-app',
    sourceUrl: 'https://github.com/toyohisa2nakada/gomoku-app/blob/main/gomoku_ai.js',
    zoom: 0.6,
  }
];

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.5-1.4 6.5-7.14a5.4 5.4 0 0 0-1.5-3.8 5.07 5.07 0 0 0-.16-3.72s-1.18-.38-3.9 1.48a13.38 13.38 0 0 0-7 0c-2.72-1.86-3.9-1.48-3.9-1.48a5.07 5.07 0 0 0-.16 3.72 5.4 5.4 0 0 0-1.5 3.8c0 5.72 3.35 6.79 6.49 7.14a4.8 4.8 0 0 0-1 3.02V22"></path>
    <path d="M9 20c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.58V22"></path>
  </svg>
);

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

function App() {
  const getIframeScale = (zoom: number) => ({
    width: `${(1 / zoom) * 100}%`,
    height: `${(1 / zoom) * 100}%`,
    transform: `scale(${zoom})`,
    transformOrigin: '0 0'
  });
  return (
    <div className="gallery-container">
      {apps.map((app) => (
        <div key={app.id} className="gallery-item">
          <iframe
            src={app.url}
            title={`${app.name} Application`}
            allow="fullscreen; clipboard-write; encrypted-media; picture-in-picture"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            style={getIframeScale(app.zoom)}
          />
          <div className="gallery-overlay">
            <div className="gallery-overlay-left">
              <div className="status-indicator"></div>
              <span>{app.name}</span>
            </div>
            <div className="gallery-overlay-right">
              <a href={app.githubUrl} target="_blank" rel="noopener noreferrer" title="GitHub Repository">
                <GithubIcon />
              </a>
              <a href={app.sourceUrl} target="_blank" rel="noopener noreferrer" title="AI Source Code">
                <CodeIcon />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
