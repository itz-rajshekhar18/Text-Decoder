// components/sample.tsx
"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { useTextDecoderContract } from "@/hooks/useContract"

const SampleIntregation = () => {
  const { isConnected } = useAccount()
  const { decodedText, decodeText, loading, error } = useTextDecoderContract()

  const [encoded, setEncoded] = useState("")
  const [shift, setShift] = useState("")

  const handleDecode = async () => {
    if (!encoded || !shift) return
    await decodeText(encoded, Number(shift))
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-foreground mb-3">Text Decoder</h2>
          <p className="text-muted-foreground">Please connect your wallet to interact with the contract.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        
        <h1 className="text-3xl font-bold text-foreground mb-4">Text Decoder</h1>
        <p className="text-muted-foreground mb-6">Decode messages using an on-chain Caesar cipher.</p>

        <div className="space-y-4">
          <input
            className="w-full px-4 py-2 bg-card border border-border rounded-lg"
            placeholder="Enter encoded text"
            value={encoded}
            onChange={(e) => setEncoded(e.target.value)}
          />

          <input
            type="number"
            min="0"
            max="255"
            className="w-full px-4 py-2 bg-card border border-border rounded-lg"
            placeholder="Shift key (0-255)"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
          />

          <button
            onClick={handleDecode}
            disabled={loading || !encoded || !shift}
            className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"
          >
            {loading ? "Decoding..." : "Decode"}
          </button>
        </div>

        {decodedText && (
          <div className="mt-6 p-4 bg-card border border-border rounded-lg">
            <p className="text-sm font-mono break-all">{decodedText}</p>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-900 border border-red-500 rounded-lg">
            <p className="text-sm text-red-200">Error: {error.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SampleIntregation

