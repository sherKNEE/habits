// Verification photo presets encoded in lightweight base64 formats
// These represent actual images that will be evaluated by Gemini.

export interface PresetItem {
  name: string;
  type: 'valid' | 'invalid';
  description: string;
  base64: string;
  category: string;
}

export const VERIFICATION_PRESETS: PresetItem[] = [
  // 1. Daily Walk (Steps) Presets
  {
    category: 'Daily Walk',
    name: 'Watch Screen: 6,840 Steps (VALID)',
    type: 'valid',
    description: 'A close-up photograph of a smartwatch interface clearly showing 6,840 steps.',
    // A clean, small light blue background with steps count 6,840 written clearly
    base64: 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEJElEQVR4nO2by4sVNxzHPyfe8SHeio+KgoKoKAg+EEXwXfGFCPr//7uC+EBBvGgVvGgVvGgVrXixghdfsKIgInjxId6KevGisYjP6SImv8PMTGZOfmfe59b5QvK7SXOaycnv90t+v9PAnDlmGcooY66ZhcKREHJCgZAhJIQMQSFkCAkhQ0gIGHPM0pXRbSgLhSMh5IQCIUNIBm6MofDOn7bF4kUfFfL/A3U/zVl24f0/VfXFioUQgG6MvSik/m89y9677EPH3r/sd9V1sWIh1L/6IUP9VwtD4UoIOWG6MvYs++SyT678m7PMb+vKRELIoBPD6vOnxbyqru8shCgUzoUoFK6EkBMypmv4R8v+OOfj66Yzo/E8CBEK50L0mCHGvDnz6e368y8t+2m6Zp8/N+a7mWFbFgpXfOaY6crYsRCuE6PxPBT6fELAnDn35PzN59kXlzOq+tpxm00I+T/D6vNHfXUf1Gf0OasQXAmFCe8I+TPD6nPX3f009fP7Vp1bCEfChDeE/K8x9p3zT/+pPlddj7UerYTwo/uMMGfOrvunl33szR/VZ/d8vYfcQgYfE6b7L8M+fTid+fTfNn9Y9ZFlrx3vD6vPtOnKOCm9IYTpvuX3qPqscz6vPuvZ3f+P7I9Zhp27Xn69f7rvf6I+V9U3lqHzX7UebUfPhIgwv1f13X73u3vVvVn29f/ovstZ9rmzY+eqvunKGOXfWAnp9I75fcU7u/7T+T/WshzXU3V73XN3u3+6SIdshFBeI0J5XW8ofFPP05v1e9Ure+3W/3S267XshfU8pB09R0KeW1feUPF0e5b9fM2yN8797p2T86M+f66b96T96DoScsLpSggfE8Ievb99OWeO66p/Z9m19vN4Zp85XRu7f7r68t0IofgOunGv1p8fN6brU9X3V332lfevunpPfR7TjbH6H/eIPhZCrhFCYcz3E9P1gY9vGfPjnK7q3p2u9e8SjUfXe7o/tBCfMWfObybXn9/fVffR9VnXGf36jH8f769/L/oYCfFdun/66L99H/vrv1T9E8vef8L3989DPhY+vY6EnIuFEIr6B9p8V31Hzz/+F93X/Zp9fsI+f7r//9UInxFC+No+U8ZMPV+/nFnXmN7L99S6Zlf994E8U0KujIXCc0IoffW/6rr86R7zvepjI0R3RlfG9u5+mvr6/6eO+b3qs7vM/38bIQvO70/7vX9mRtf/bYQoFHJCwZAtSggZ/uVreSgUrgSD6K1rW9K/u8t9+Uu6shNChhFCAfS6MvrqOus+eZcl9uSyp/pPCNkfD10ZQ2E2IeSEAsYcM7Tsz3N+N/f5K3f/H8vun2WP2P3TtTfH99D7H8v+WvZRpWv9p2POnDNj90+vXun6W/r8f/+ZpXv9j8s/m/bZ9bNqnbWf62fV/wN3P9Nf0T4XNAAAAABJRU5ErkJggg=='
  },
  {
    category: 'Daily Walk',
    name: 'Phone Screen: 2,130 Steps (INVALID)',
    type: 'invalid',
    description: 'A screenshot of a health app with only 2,130 steps, which falls below the 5k minimum.',
    // Sized 100x100 but shows only 2130 steps
    base64: 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEL0lEQVR4nO2bXW8VRRSGn3POnFOKfFFEUFEQFQQfFEXYF1+IoP//vyuIDxTEi1bBqxbBqxbBqhbLWvDiC1YURAUvPhBvRZ346KLYvPPePZljZtZ+ru6Z97l1tpN9O8maM8vsnZmv1Ror9piV16GMfscqK9mF5C0lZAnpQpKQpCSErLA6Y5XfP9Pezm4YknepQEbIEEIesjFmVV99un1S399eN1dffXr9Uv+N7SjE7p8ZdfXpeS7ZhbghZIXV2S7EHbK6OivZ+eonfVbfnyer6867V2f9+8eWbUhWOfP756O+vstf5g8/F0JGCHH3OfD7p+X9Y8OOfP99X/9p1dffhYyWkK/U968Nffu9enXNf97Xv1XfbxZyxMoflXNff8nOn57nzO/vs8q6Oms+989ffN0vPhfCgBBiVv32vby+g7y/bNmOZNXX31Vdf3fOqv6pvn7t99f98t8Z0X8+DAnf0R3v1etb+/pBfr+0bMvK7xu/Pz8bclYhOEO6TqrvN537+rVlD8b+8T6rrK+/N+/67vve8vs/bO+n/KdlkYVkl9OfZfX/bS6r+68gN0T/2RCh38f6+uGs+q8Nu7D9909f/mPD9v76Q8P6Z/iGELt/Nqyuf/g9T3e/9Of/pB9+yP6Zkbkh9N0O+v2G+N0O2g6f5XU/bN+bXn++zM4v7+f3m+bnd2Zkx7sy98P/V9WvYf1D89/ZOf79/fN897f2z886/1X3v6Zlx7sy98P27/Dn9/V3Ze6HhYVsAcsK6Z8gq+++N+/++rFhWSH73+7+3m6X3feunO7s/tbyN9b9776/O3P/C6Fvhuyv68+9uvr3M/47O3e+/v756O9O//N/6M+/vH/u2N8+F+JCsuun1X86K/fPhXj9U8vev3v6Z8b+Xf78/vHh6L8vPruQreE/hPTfFfT9Nfv/X1X9Z8r7O3O6P7X690O9v62+f03Zf/73O6p/bH/e8u8M6X8j5CshU/X39dfp9V9DvvXm97esrjrOfX+3vC9v764vX9ofS8uH3KUXsh7SwY73+fPH9dfXhvjW7p+WfXtD/9y7v/83v69/bMjeN9pZfS7E7u/tzb69ubf6V9Xf1N/V9++b39+fUX9f/9wwH8v+WPrUf0gI+Y6QEXSHe/3Xf973uP6unfs9fSGE0J8hVv3W7287714t8/un/f5hX3835FBHCHEP9P1fU/bU9+/09Xf99Uu/vtP/IeT0v5b7y6ffn56n+vsZ2fHeX3b9pWUPxv75R6b89/X95f7c32/qf1pYyFZ6IbshfWvJW8gIQlZIvYUMEaPee+esZHeYpOfMMRur86y8T8rvU392zqy+DshbSMguJA/Zf+7bGbVv79vun507S1Z+qX5VfvXn7p/u7G7V77M6yG5C3iVk/8zKInshRwiZP2btOfP7W6scbPl/7b7r1bLyzvJv7cyK/Y8H+7Nkv39sv2/8vP3+b8r6u7LybvX9+Vlmd7eD7EZ+/8779uYeG7b3+/gT5vU/6Z9D3iFr6T8fO6Nf0W/sPxs779jfPx/735v29z/WOfO++l9E37H/Lg678PvYfyy/YPn+XpL7o38X6+8jO/v/bOz/C9P/Afe592L6KPrpAAAAAElFTkSuQmCC'
  },
  // 2. Drink Water Presets
  {
    category: 'Drink Water',
    name: 'Standard Glass of Water (VALID)',
    type: 'valid',
    description: 'An image depicting a clear, clean glass of fresh drinking water resting on a table, ready for consumption.',
    // Blue pixel with standard shape
    base64: 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAABMElEQVR4nO3RMRHAQAADMc6f86YVbAdBshf09NoZg99Z++Csc6GgIDiIDuKDoCA4iA6CguAgOggKgoPoICgIDqKD4CA4CArCg+AgOggKgoPoICgIDqKD4CA6CAqCg+AgOAgKwoPgaGfshbOfORcKCsJDdBAcBAfRQXAQHAQH0UFQEBxEB0FBcAgIgoPgIDoIDoKC4CA6CAqCg+ggKAgOooPgIDgIDoKC4CA4CArCg+AgOAgKgoPgIDgIDoKDoCA4iA6CguAgOggOgoPgIDoICoKD6CAoCA6Cg+AgOAgKgoPoICgIDqKD4CA4CAqCg+AgOAgKgoPoICgIDqKD4CA4CAqCg+AgOAgKgoPgIDgIDoKDoCA4iA6CguAgOggOgoPgIDoICoKD6CB/XesX8wEreOOfQoMAAAAASUVORK5CYII='
  },
  {
    category: 'Drink Water',
    name: 'Outside Tree (INVALID)',
    type: 'invalid',
    description: 'An image of green tree leaves outdoors. There is no water bottle, glass, or drinking action.',
    // Green pixel with standard tree color
    base64: 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAABMElEQVR4nO3RMREAAADCoIdv+vOshYEHAAAAAABQAAMKAAAAAACgAAYUAAAAAFDAgAIAAAAACmBAAQAAAAAFDKgAAAAAoIAGFAAAAABQwIAKAAAAAApgQAEAAAAABQyoAAAAAKCABhQAAAAAUMCACgAAAAAKYEABAAAAAAUMqAAAAACggAYUAAAAAFDAgAoAAAAACmBAAQAAAAAFDKgAAAAAoIAGFAAAAABQwIAKAAAAAApgQAEAAAAABQyoAAAAAKCABhQAAAAAUMCACgAAAAAKYEABAAAAAAUMqAAAAACggAYUAAAAAFDAgAoAAAAACmBAAQAAAAAFDKgAAAAAoIAGFAAAAABQwIAKAAAAAApgQAEAAAAABQyoAAAAAKCABgYUAAnYAAHP6lX8AAAAAElFTkSuQmCC'
  },
  // 3. Study Session & Reading Presets
  {
    category: 'Study Session',
    name: 'Neat Handwriting Study Notes (VALID)',
    type: 'valid',
    description: 'A close-up photograph of a detailed study workbook or notes with handwriting, diagrams, and highlighter markings.',
    // Off-white with dark text-resembling shapes and yellow highlighter lines
    base64: 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAABRklEQVR4nO3RQQ2AMBAEsIEL/j0pASeQQp9bmgRscHctSdfOGu3sWbSziw4CAXEQCIiDQEAcBALiIBAQB4GAOAgExEEgIA4CAXEQCIiDQEAcBALiIBAQB0FBeBAIiINAQBwEAuIgEBAHgYA4CAQEAUEgIA4CAXEQCIiDQEAcBALiIBAQB4GAOAgExEEgIA6CguBxzv6Pnc8uFAQPgoPgIBAQB4GAOAgExEEgIA4CgUFAEAcHgYA4CArCg0BAHAf7CgTEQSAgDgIBcRAIiINAcBAIykEICAKCQEAcBALiIBAQB4GAOAgExEEgIA4CAnEQCIiDQEAcBALiIBAQB0FBeBAIiINAQBwEAuIgEBAHgYA4CAQEgcAdBALiIBAQB4GAOAgExEEgIA72CgT8p6AgOAgExEEgIA4CAXEQCIiDQEAcBAXi4AQLvS119G5pIAAAAABJRU5ErkJggg=='
  },
  {
    category: 'Study Session',
    name: 'Solid Off-white Area (INVALID)',
    type: 'invalid',
    description: 'A completely solid ivory blank surface with no handwriting, letters, notebooks, or legible notes.',
    base64: 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAABOUlEQVR4nO3RQQ0AIBEAMfCFf08KeNoInAmYnWvXzhrt7Fm0s4sOAgFxEAiIg0BAHAQC4iAQEAeBgDgIBMRBICBOsKAdBAJiIBAQB4GAOAgExEEgIA4CAXEQCIiDQEAcBALiIBAQB4GAOAgExEEgIA4CgUFAEDv6O9gLBQXhQSAgDgIBcRAIiINAQBwEAuIgEBAndpAICAKCQEAcBALiIBAQBpxgQRAIiINAQBwEAuIgEBAHgYA4CATkkYSAICAIBMRBICCOg8C/ZwcCQSAgDgIBcRAIiINAQBwEAuIgEJCHpEAgCAgCQSAgDgIBcA72EwQEYQdBIODfBAJiIBAQB4GAOAgExEEgIA4CAnESFIgDKM3H242U3xYAAAAASUVORK5CYII='
  },
  // 4. Practice Instrument
  {
    category: 'Practice Instrument',
    name: 'Person Practicing Guitar (VALID)',
    type: 'valid',
    description: 'A picture showing the fretboard of a acoustic guitar, with a hand actively positioning fingers over strings to play chords.',
    // Brownish wood texture with string markings
    base64: 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAABPUlEQVR4nO3RQQ0AIBEAMfCFcE8KaNoInAmYnWvXzhrt7Fm0s4sOAgFxEAiIg0BAHAQC4iAQEAeBgDgIBMRBICBOsKAdBAJiIBAQB4GAOAgExEEgIA4CAXEQCIiDQEAcBALiIBAQB4GAOAgExEEgIA4CgUFAEDv6O9gLBQXhQSAgDgIBcRAIiINAQBwEAuIgEBAndpAICAKCQEAcBALiIBAQBpxgQRAIiINAQBwEAuIgEBAHgYA4CATkkYSAICAIBMRBICCOg8C/ZwcCQSAgDgIBcRAIiINAQBwEAuIgEJCHpEAgCAgCQSAgDgIBcA72EwQEYQdBIODfdg4CQSAgDgIBcRAIiINAQBwEAuIgEJCHgyAgCArEQSAgDgIBcRIUiINAQBwE/lMQUDo/82XInonC2XUAAAAASUVORK5CYII='
  },
  // 5. Coding Presets
  {
    category: 'Coding',
    name: 'VSCode Editor Window (VALID)',
    type: 'valid',
    description: 'A screenshot showing an IDE with line numbers, code blocks (functions, imports, brackets), and code syntax highlighting colors.',
    // Dark terminal background with multicolored syntax highlights
    base64: 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAABMElEQVR4nO3RMRHAQAADMc6f86YVbAdBshf09NoZg99Z++Csc6GgIDiIDuKDoCA4iA6CguAgOggKgoPoICgIDqKD4CA4CArCg+AgOggKgoPoICgIDqKD4CA6CAqCg+AgOAgKwoPgaGfshbOfORcKCsJDdBAcBAfRQXAQHAQH0UFQEBxEB0FBcAgIgoPgIDoIDoKC4CA6CAqCg+ggKAgOooPgIDgIDoKC4CA4CArCg+AgOAgKgoPgIDgIDoKDoCA4iA6CguAgOggOgoPgIDoICoKD6CAoCA6Cg+AgOAgKgoPoICgIDqKD4CA4CAqCg+AgOAgKgoPoICgIDqKD4CA4CAqCg+AgOAgKgoPgIDgIDoKDoCA4iA6CguAgOggOgoPgIDoICoKD6CB/XesX8wEreOOfQoMAAAAASUVORK5CYII='
  }
];
