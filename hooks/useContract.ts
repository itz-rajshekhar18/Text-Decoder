// hooks/useContract.ts
"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { contractABI, contractAddress } from "@/lib/contract"
import { readContract } from "wagmi/actions"
import { config } from "@/lib/wagmi"

export const useTextDecoderContract = () => {
  const { address } = useAccount()
  
  const [decodedText, setDecodedText] = useState<
string>("")
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const decodeText = async (encoded: string, shift: number) => {
    if (!encoded) return
    try {
      setLoading(true)
      setError(null)

      const result = await readContract(config, {
        address: contractAddress,
        abi: contractABI,
        functionName: "caesarDecode",
        args: [encoded, shift]
      })

      setDecodedText(result as string)
    } catch (err) {
      console.error(err)
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  return {
    decodedText,
    decodeText,
    loading,
    error,
    isConnected: !!address
  }
}
