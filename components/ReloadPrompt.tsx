import React from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

function ReloadPrompt() {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('SW Registered: ' + r)
        },
        onRegisterError(error) {
            console.log('SW registration error', error)
        },
    })

    const close = () => {
        setOfflineReady(false)
        setNeedRefresh(false)
    }

    if (!offlineReady && !needRefresh) return null

    return (
        <div className="fixed bottom-5 right-5 z-50 p-4 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col gap-2 max-w-sm animate-fade-in">
            <div className="text-sm text-gray-700">
                {offlineReady
                    ? <span>App ready to work offline</span>
                    : <span>New content available, click on reload button to update.</span>
                }
            </div>
            <div className="flex gap-2 justify-end">
                {needRefresh && (
                    <button
                        className="px-3 py-1 bg-primary text-white rounded text-xs font-semibold hover:bg-primary-dark transition-colors"
                        onClick={() => updateServiceWorker(true)}
                    >
                        Reload
                    </button>
                )}
                <button
                    className="px-3 py-1 border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                    onClick={close}
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default ReloadPrompt
