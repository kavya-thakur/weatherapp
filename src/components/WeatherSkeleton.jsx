const WeatherSkeleton = () => (
  <div className="space-y-10 p-4 lg:p-0">
    {/* Hero Skeleton - Deepened for visibility */}
    <div className="h-[480px] w-full bg-slate-200/60 rounded-[3rem] relative overflow-hidden">
      {/* High-intensity shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />

      {/* Mock content blocks to make it feel like a real card */}
      <div className="p-12 space-y-8">
        <div className="h-4 w-32 bg-slate-300/50 rounded-full" />
        <div className="h-24 w-48 bg-slate-300/50 rounded-3xl" />
        <div className="h-6 w-64 bg-slate-300/50 rounded-full" />
      </div>
    </div>

    {/* Analytics Header Skeleton */}
    <div className="flex items-center gap-4 px-4 mb-8">
      <div className="h-3 w-40 bg-slate-200 rounded-full" />
      <div className="h-[1px] flex-1 bg-slate-100" />
    </div>

    {/* Charts Skeleton - Bento Grid style */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="h-80 bg-slate-100/80 rounded-[2.5rem] lg:col-span-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        <div className="m-8 h-4 w-24 bg-slate-200/60 rounded-full" />
      </div>

      <div className="h-80 bg-slate-100/80 rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite]" />
        <div className="m-8 h-4 w-24 bg-slate-200/60 rounded-full" />
      </div>
    </div>

    <style
      dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `,
      }}
    />
  </div>
);
export default WeatherSkeleton;
