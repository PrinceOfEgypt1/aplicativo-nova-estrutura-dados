import '@testing-library/jest-dom'; // Importa os matchers do DOM
import { TextEncoder, TextDecoder } from 'util';

// Define TextEncoder e TextDecoder no escopo global
globalThis.TextEncoder = TextEncoder as any;
globalThis.TextDecoder = TextDecoder as any;
