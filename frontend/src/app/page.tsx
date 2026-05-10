'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [jdText, setJdText] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [status, setStatus] = useState({ message: '', type: '' });

  const handleRunAnalysis = async () => {
    if (!jdText) {
      setStatus({ message: 'Please provide a Job Description.', type: 'error' });
      return;
    }
    if (!files || files.length === 0) {
      setStatus({ message: 'Please upload at least one resume.', type: 'error' });
      return;
    }

    setLoading(true);
    setStatus({ message: 'Uploading JD...', type: 'info' });

    try {
      // 1. Upload JD
      const jdFormData = new FormData();
      jdFormData.append('jd_text', jdText);
      
      const jdResponse = await fetch('http://localhost:8000/api/upload_jd', {
        method: 'POST',
        body: jdFormData,
      });
      
      if (!jdResponse.ok) throw new Error('Failed to upload JD');

      setStatus({ message: 'Uploading Resumes...', type: 'info' });

      // 2. Upload Resumes
      const fileFormData = new FormData();
      Array.from(files).forEach((file) => {
        fileFormData.append('files', file);
      });

      const fileResponse = await fetch('http://localhost:8000/api/upload_resumes', {
        method: 'POST',
        body: fileFormData,
      });

      if (!fileResponse.ok) throw new Error('Failed to upload resumes');

      setStatus({ message: 'Analyzing and Ranking...', type: 'info' });

      // 3. Get Rankings
      const rankResponse = await fetch('http://localhost:8000/api/rank_candidates');
      if (!rankResponse.ok) throw new Error('Failed to get rankings');

      const data = await rankResponse.json();
      setResults(data);
      setStatus({ message: 'Analysis Complete!', type: 'success' });
    } catch (error: any) {
      setStatus({ message: error.message || 'An error occurred during analysis.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-gray-200 p-6 md:p-12 font-sans selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto space-y-12 relative">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

        {/* Header */}
        <header className="text-center space-y-4 pt-8">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold tracking-wide uppercase mb-2">
            HR Tech Solutions
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            AI Resume Screener
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Empowering recruiters with automated semantic analysis and intelligent candidate ranking.
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: Job Description */}
          <div className="bg-[#111111] p-8 rounded-3xl shadow-2xl border border-gray-800/60 backdrop-blur-sm relative overflow-hidden group hover:border-gray-700 transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-100">
              <span className="bg-gray-800 p-2 rounded-xl mr-3 text-blue-400">📝</span> 
              Job Description
            </h2>
            <textarea
              className="w-full h-72 p-5 bg-[#0a0a0a] border border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none text-gray-300 placeholder-gray-600 custom-scrollbar"
              placeholder="Paste the target Job Description here to start matching..."
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            />
          </div>

          {/* Right Column: Resumes */}
          <div className="bg-[#111111] p-8 rounded-3xl shadow-2xl border border-gray-800/60 backdrop-blur-sm relative overflow-hidden group hover:border-gray-700 transition-colors duration-300 flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-100">
              <span className="bg-gray-800 p-2 rounded-xl mr-3 text-purple-400">📂</span> 
              Candidate Resumes
            </h2>
            <div className="flex-grow flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-2xl bg-[#0a0a0a] hover:bg-[#0f0f0f] hover:border-gray-500 transition-all duration-300 p-8 relative group/dropzone">
              <input
                type="file"
                multiple
                accept=".pdf,.docx"
                onChange={(e) => setFiles(e.target.files)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="text-center transform group-hover/dropzone:scale-105 transition-transform duration-300">
                <div className="bg-gray-800/50 p-4 rounded-full inline-block mb-4">
                  <svg className="mx-auto h-10 w-10 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-base text-gray-300 font-medium">
                  Drag & drop resumes or click to browse
                </p>
                <p className="mt-2 text-xs text-gray-500 uppercase tracking-wider font-semibold">Supported: PDF, DOCX (Max 10MB)</p>
              </div>
            </div>
            {files && files.length > 0 && (
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-between">
                <span className="text-sm text-blue-200 font-medium flex items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
                  {files.length} document(s) queued for analysis
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col items-center space-y-6 pt-4">
          <button
            onClick={handleRunAnalysis}
            disabled={loading}
            className={`relative overflow-hidden group px-10 py-5 rounded-2xl font-bold text-lg text-white shadow-2xl transition-all duration-300 ${
              loading ? 'bg-gray-800 text-gray-400 cursor-not-allowed border border-gray-700' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:shadow-[0_0_40px_rgba(79,70,229,0.4)] transform hover:-translate-y-1'
            }`}
          >
            {loading && (
              <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
            )}
            <span className="relative flex items-center justify-center">
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Data...
                </>
              ) : (
                <>
                  <span className="mr-2">✨</span> Generate Rankings
                </>
              )}
            </span>
          </button>
          
          {status.message && (
            <div className={`px-6 py-3 rounded-xl text-sm font-medium border backdrop-blur-md animate-fade-in-up ${
              status.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
              status.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
              'bg-blue-500/10 border-blue-500/20 text-blue-400'
            }`}>
              {status.message}
            </div>
          )}
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="bg-[#111111] rounded-3xl shadow-2xl border border-gray-800/60 overflow-hidden mt-16 animate-fade-in-up">
            <div className="p-8 border-b border-gray-800/60 bg-gradient-to-r from-[#111111] to-[#151515] flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-100 flex items-center">
                  <span className="text-yellow-500 mr-3">🏆</span> Top Candidates Match
                </h2>
                <p className="text-gray-500 text-sm mt-1">Ranked by semantic similarity to the Job Description</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="text-xs text-gray-500 uppercase bg-[#0a0a0a] border-b border-gray-800">
                  <tr>
                    <th className="px-8 py-5 font-semibold tracking-wider">Rank</th>
                    <th className="px-8 py-5 font-semibold tracking-wider">Candidate Profile</th>
                    <th className="px-8 py-5 font-semibold tracking-wider">Match Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {results.map((result, idx) => (
                    <tr key={result.id} className="hover:bg-[#151515] transition-colors duration-200 group">
                      <td className="px-8 py-6">
                        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-bold ${
                          idx === 0 ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' :
                          idx === 1 ? 'bg-gray-300/20 text-gray-300 border border-gray-300/30' :
                          idx === 2 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                          'bg-gray-800 text-gray-400'
                        }`}>
                          {idx + 1}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-100 text-base">{result.name}</span>
                          <span className="text-gray-500 text-xs mt-1 font-mono">{result.filename}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center max-w-xs">
                          <div className="w-full bg-gray-800 rounded-full h-3 mr-4 overflow-hidden border border-gray-700">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ease-out relative ${
                                result.score >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-400' :
                                result.score >= 50 ? 'bg-gradient-to-r from-yellow-500 to-amber-400' :
                                'bg-gradient-to-r from-red-500 to-rose-400'
                              }`}
                              style={{ width: `${Math.min(100, Math.max(0, result.score))}%` }}
                            >
                              <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-stripes"></div>
                            </div>
                          </div>
                          <span className={`font-bold ${
                            result.score >= 80 ? 'text-emerald-400' :
                            result.score >= 50 ? 'text-amber-400' :
                            'text-rose-400'
                          }`}>
                            {result.score.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      
      {/* Custom Styles for animations and scrollbar */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        @keyframes stripes {
          from { background-position: 1rem 0; }
          to { background-position: 0 0; }
        }
        .animate-stripes {
          animation: stripes 1s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0a0a0a;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #444;
        }
      `}</style>
    </main>
  );
}

