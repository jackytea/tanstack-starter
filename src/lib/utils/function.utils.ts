const handleErrorWithNull = async <DataType>(callback: () => Promise<DataType>) => {
  try {
    const value = await callback()

    return value
  } catch {
    return null
  }
}

export { handleErrorWithNull }
