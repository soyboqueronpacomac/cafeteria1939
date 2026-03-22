export interface ProcessStep {
  title: string
  description: string
  imageUrl: string
}

export interface ProcessPage {
  title: string
  subtitle: string
  backgroundImage?: string
  content: string
  steps: ProcessStep[]
}
