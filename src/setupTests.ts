// src/setupTests.ts
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

globalThis.TextEncoder = TextEncoder as any; // Asserção de tipo como any
globalThis.TextDecoder = TextDecoder as any; // Asserção de tipo como any