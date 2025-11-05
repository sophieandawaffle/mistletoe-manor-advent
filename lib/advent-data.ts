export interface DayContent {
  day: number
  title: string
  storyText: string
  illustrationUrl: string
  clueCardUrl: string
  doorImageUrl: string // Added doorImageUrl for custom SVG door images
  interactiveUrl?: string // URL to interactive game/content (replaces illustrationUrl when set)
  puzzle?: {
    type: "text-input" | "multiple-choice" | "reveal"
    question?: string
    answer?: string
    options?: string[]
    revealText?: string
  }
}

// Calendar-specific data storage
type CalendarData = Record<string, DayContent[]>

// Generate Murder at Mistletoe Manor data
const generateMistletoeManorData = (): DayContent[] => {
  return Array.from({ length: 24 }, (_, i) => {
    const day = i + 1

    let illustrationUrl = `/placeholder.svg?height=400&width=600&query=vintage Christmas mystery illustration day ${day}`

    if (day === 1) {
      illustrationUrl = `/images/clues/day1letter.svg`
    } else if (day === 2) {
      illustrationUrl = `/images/clues/day2letter.svg`
    } else if (day === 3) {
      illustrationUrl = `/images/clues/day3letter.svg`
    } else if (day === 4) {
      illustrationUrl = `/images/clues/day4image.svg`
    } else if (day === 5) {
      illustrationUrl = `/images/clues/day5letter.svg`
    } else if (day === 6) {
      illustrationUrl = `/images/clues/day6image.svg`
    } else if (day === 7) {
      illustrationUrl = `/images/clues/day7letter.svg`
    } else if (day === 8) {
      illustrationUrl = `/images/clues/day8letter.svg`
    } else if (day === 9) {
      illustrationUrl = `/images/clues/day9letter.svg`
    } else if (day === 10) {
      illustrationUrl = `/images/clues/day10image.svg`
    } else if (day === 11) {
      illustrationUrl = `/images/clues/day11letter.svg`
    } else if (day === 12) {
      illustrationUrl = `/images/clues/day12letter.svg`
    } else if (day === 13) {
      illustrationUrl = `/images/clues/day13image.svg`
    } else if (day === 14) {
      illustrationUrl = `/images/clues/day14letter.svg`
    } else if (day === 15) {
      illustrationUrl = `/images/clues/day15image.svg`
    } else if (day === 16) {
      illustrationUrl = `/images/clues/day16letter.svg`
    } else if (day === 17) {
      illustrationUrl = `/images/clues/day17image.svg`
    } else if (day === 18) {
      illustrationUrl = `/images/clues/day18letter.svg`
    } else if (day === 19) {
      illustrationUrl = `/images/clues/day19letter.svg`
    } else if (day === 20) {
      illustrationUrl = `/images/clues/day20letter.svg`
    } else if (day === 21) {
      illustrationUrl = `/images/clues/day21image.svg`
    } else if (day === 22) {
      illustrationUrl = `/images/clues/day22letter.svg`
    } else if (day === 23) {
      illustrationUrl = `/images/clues/day23image.svg`
    } else if (day === 24) {
      illustrationUrl = `/images/clues/day24letter.svg`
    }

    return {
      day,
      title: `Day ${day}: Mystery Unfolds`,
      storyText: `This is placeholder text for Day ${day}. Replace this with your custom story content, clues, and narrative for the Murder at Mistletoe Manor mystery.`,
      illustrationUrl,
      clueCardUrl: `/placeholder.svg?height=300&width=400&query=vintage clue card with magnifying glass day ${day}`,
      doorImageUrl: `/images/doors/door-${day}.svg`,
      puzzle:
        day % 3 === 0
          ? {
              type: "reveal",
              revealText: "Tap to reveal the hidden clue...",
            }
          : undefined,
    }
  })
}

// Generate Christmas Conspiracy data
const generateChristmasConspiracyData = (): DayContent[] => {
  return Array.from({ length: 24 }, (_, i) => {
    const day = i + 1

    // Day 1 uses the Manor Cipher game
    if (day === 1) {
      return {
        day,
        title: `Day ${day}: The Manor Cipher`,
        storyText: `Decode the cryptic message to discover the location of the Christmas treasure!`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/manor-cipher.html`, // Interactive cipher game for day 1
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
        doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      }
    }

    // Day 2 uses the Christmas Word Mystery game
    if (day === 2) {
      return {
        day,
        title: `Day ${day}: Cozy Christmas Word Mystery`,
        storyText: `Solve the festive mystery word! Guess the 5-letter Christmas word in 6 attempts.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/christmas-word-mystery.html`, // Interactive word game for day 2
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
        doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      }
    }

    // Day 3 uses the Christmas Anagram Mystery game
    if (day === 3) {
      return {
        day,
        title: `Day ${day}: Christmas Anagram Mystery`,
        storyText: `Unscramble the festive words! Solve all 15 Christmas-themed anagrams.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/christmas-anagram-mystery.html`, // Interactive anagram game for day 3
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
        doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      }
    }

    // Day 4 uses the Whispers in the Hall deduction game
    if (day === 4) {
      return {
        day,
        title: `Day ${day}: Whispers in the Hall`,
        storyText: `Use logic and deduction to solve the Victorian Christmas Eve mystery!`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/whispers-in-hall.html`, // Interactive deduction game for day 4
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
        doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      }
    }

    // Day 5 uses the Christmas Conundrum riddle game
    if (day === 5) {
      return {
        day,
        title: `Day ${day}: The Christmas Conundrum`,
        storyText: `Solve 5 mysterious riddles to unlock the secrets of Mistletoe Manor!`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/christmas-conundrum.html`, // Interactive riddle game for day 5
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
        doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      }
    }

    // Day 6 uses the Letters from the Library movie mystery game
    if (day === 6) {
      return {
        day,
        title: `Day ${day}: Letters from the Library`,
        storyText: `Use analogies to discover famous Christmas movie titles! Drag and drop to complete the puzzles.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/letters-from-library.html`, // Interactive drag-and-drop game for day 6
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
        doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      }
    }

    // Day 7 uses the Manor Maze word search game
    if (day === 7) {
      return {
        day,
        title: `Day ${day}: The Manor Maze`,
        storyText: `Find all 12 mystery words hidden in the grid! Click and drag to select words and discover the clues.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/manor-maze-wordsearch.html`, // Interactive word search game for day 7
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
        doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      }
    }

    // Day 8 uses the Locked Drawer Puzzle code game
    if (day === 8) {
      return {
        day,
        title: `Day ${day}: The Cryptkeeper's Vault`,
        storyText: `Solve the mathematical riddle to unlock the ancient vault! Enter the 4-digit code based on the clue.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/locked-drawer-puzzle.html`, // Interactive code puzzle for day 8
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
        doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      }
    }

    // Day 9 uses the Spot the Difference game
    if (day === 9) {
      return {
        day,
        title: `Day ${day}: Spot the Difference`,
        storyText: `Can you spot all the differences between these two scenes? Click on each difference you find!`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/spot-the-difference.html`, // Interactive spot the difference game for day 9
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
        doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      }
    }

    // Day 10 uses the Christmas Mystery Cipher game
    if (day === 10) {
      return {
        day,
        title: `Day ${day}: The Christmas Cipher`,
        storyText: `Decode the cryptic message to discover the Christmas secret!`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/christmas-mystery-cipher.html`, // Interactive cipher game for day 10
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
        doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      }
    }

    // Day 11 uses the Christmas Cookie Code game
    if (day === 11) {
      return {
        day,
        title: `Day ${day}: The Christmas Cookie Code`,
        storyText: `Crack the 3-digit code using three Christmas clues to recover the stolen cookies!`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/christmas-cookie-code.html`, // Interactive code puzzle for day 11
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
        doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      }
    }

    // Day 12 uses the Christmas Memory Match game
    if (day === 12) {
      return {
        day,
        title: `Day ${day}: Christmas Memory Match`,
        storyText: `Test your memory skills! Match all the Christmas pairs to complete the challenge!`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/christmas-memory-match.html`, // Interactive memory match game for day 12
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
        doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      }
    }

    // Day 13 uses the Twelve Strikes at Midnight game
    if (day === 13) {
      return {
        day,
        title: `Day ${day}: Twelve Strikes at Midnight`,
        storyText: `Beat the clock! Answer 12 Christmas questions before time runs out!`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/twelve-strikes-midnight.html`, // Interactive trivia game for day 13
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
        doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      }
    }

    // Day 14 uses the Cipher of Carols game
    if (day === 14) {
      return {
        day,
        title: `Day ${day}: Cipher of Carols`,
        storyText: `Decode the Christmas carols! Famous carol lines have key words swapped. Can you guess the real title?`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/cipher-of-carols.html`, // Interactive carol cipher game for day 14
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
        doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      }
    }

    // Day 15 uses the Mystery Clue Logic Puzzle game
    if (day === 15) {
      return {
        day,
        title: `Day ${day}: The Case of the Missing Diamond`,
        storyText: `Use logic and deduction to solve the mystery! Can you identify the thief, their location, and what they were wearing?`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/mystery-clue-logic-puzzle.html`, // Interactive logic puzzle game for day 15
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
        doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      }
    }

    // Day 16 uses the Christmas Book Riddle game
    if (day === 16) {
      return {
        day,
        title: `Day ${day}: Christmas Book Riddle Game`,
        storyText: `Test your knowledge of Christmas-themed books! Can you guess the titles from these festive riddles and clues?`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/christmas-book-riddle.html`, // Interactive book riddle game for day 16
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
        doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      }
    }

    // Day 17 uses the Christmas Mystery Riddle game
    if (day === 17) {
      return {
        day,
        title: `Day ${day}: Christmas Mystery Riddle Game`,
        storyText: `Help Santa Find His Missing Reindeer! Solve these festive riddles to discover where each reindeer is hiding.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/christmas-mystery-riddle.html`, // Interactive mystery riddle game for day 17
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
        doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      }
    }

    // Day 18 uses the Christmas Cipher Challenge game
    if (day === 18) {
      return {
        day,
        title: `Day ${day}: Christmas Cipher Challenge`,
        storyText: `Decode the Christmas mysteries hidden in these festive ciphers! Master different cipher types to solve all the puzzles.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/christmas-cipher-challenge.html`, // Interactive cipher challenge game for day 18
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
        doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      }
    }

    // Day 19 uses the Frozen Words game
    if (day === 19) {
      return {
        day,
        title: `Day ${day}: Frozen Words`,
        storyText: `Click letters to defrost them and guess the hidden word before time runs out! Use your clicks wisely!`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/frozen-words.html`, // Interactive frozen words game for day 19
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
        doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      }
    }

    // Day 20 uses the Christmas Word Wheel game
    if (day === 20) {
      return {
        day,
        title: `Day ${day}: Christmas Word Wheel`,
        storyText: `Make words using the letters around the wheel. Each letter can only be used once per word, and you must always include the center letter!`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/christmas-word-wheel.html`, // Interactive word wheel game for day 20
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
        doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      }
    }

    // Day 21 uses the Christmas Connections game
    if (day === 21) {
      return {
        day,
        title: `Day ${day}: Christmas Connections`,
        storyText: `Find groups of 4 related Christmas words! Select 4 words that belong to the same category.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/christmas-connections.html`, // Interactive connections game for day 21
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
        doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      }
    }

    // Day 22 uses the Christmas Word Mystery game (variant 2)
    if (day === 22) {
      return {
        day,
        title: `Day ${day}: Cozy Christmas Word Mystery`,
        storyText: `🎄 Solve the festive mystery word! 🎄 Guess the 5-letter Christmas word in 6 attempts!`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/christmas-word-mystery-2.html`, // Interactive word mystery game for day 22
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
        doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      }
    }

    // Day 23 uses the Christmas History Quiz game
    if (day === 23) {
      return {
        day,
        title: `Day ${day}: Christmas History Quiz`,
        storyText: `Test your knowledge of Christmas traditions, history, and fascinating facts! From ancient origins to modern celebrations, discover how much you really know about the most wonderful time of the year.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/christmas-history-quiz.html`, // Interactive history quiz game for day 23
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
        doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      }
    }

    // Day 24 uses the Missing Star Mystery game
    if (day === 24) {
      return {
        day,
        title: `Day ${day}: The Missing Star Mystery`,
        storyText: `Santa's magical Christmas Star has been stolen! Solve each puzzle carefully — every answer gives you a clue to the thief's identity.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/missing-star-mystery.html`, // Interactive mystery puzzle game for day 24
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
        doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      }
    }

    return {
      day,
      title: `Day ${day}: The Conspiracy Deepens`,
      storyText: `This is placeholder text for Day ${day}. Replace this with your custom story content, clues, and narrative for the Christmas Conspiracy mystery.`,
      illustrationUrl: `/placeholder.svg?height=400&width=600&query=Christmas conspiracy illustration day ${day}`,
      clueCardUrl: `/placeholder.svg?height=300&width=400&query=conspiracy clue card day ${day}`,
      doorImageUrl: `/images/christmas_conspiracy_advent_doors/${day}.svg`,
      puzzle:
        day % 4 === 0
          ? {
              type: "reveal",
              revealText: "Tap to reveal the hidden conspiracy clue...",
            }
          : undefined,
    }
  })
}

// Generate A Very Sudoku Christmas data
const generateSudokuChristmasData = (): DayContent[] => {
  return Array.from({ length: 24 }, (_, i) => {
    const day = i + 1

    // Day 1 uses the PuzzleMe sudoku embed
    if (day === 1) {
      return {
        day,
        title: `Day ${day}: Sudoku Challenge`,
        storyText: `Welcome to your first sudoku challenge! Use your logic and number skills to complete this festive puzzle.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/sudoku-day-1.html`, // Interactive sudoku puzzle for day 1
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
        doorImageUrl: `/1.svg`,
      }
    }

    // Day 2 uses the PuzzleMe sudoku embed
    if (day === 2) {
      return {
        day,
        title: `Day ${day}: Sudoku Challenge`,
        storyText: `Continue your sudoku journey! Solve this festive puzzle to unlock the next clue.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/sudoku-day-2.html`, // Interactive sudoku puzzle for day 2
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
        doorImageUrl: `/2.svg`,
      }
    }

    // Day 3 uses the PuzzleMe sudoku embed
    if (day === 3) {
      return {
        day,
        title: `Day ${day}: Sudoku Challenge`,
        storyText: `Keep the momentum going! Solve this festive sudoku puzzle.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/sudoku-day-3.html`, // Interactive sudoku puzzle for day 3
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
        doorImageUrl: `/3.svg`,
      }
    }

    // Day 4 uses the PuzzleMe sudoku embed
    if (day === 4) {
      return {
        day,
        title: `Day ${day}: Sudoku Challenge`,
        storyText: `You're making great progress! Solve this festive sudoku puzzle.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/sudoku-day-4.html`, // Interactive sudoku puzzle for day 4
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
        doorImageUrl: `/4.svg`,
      }
    }

    // Day 5 uses the PuzzleMe sudoku embed
    if (day === 5) {
      return {
        day,
        title: `Day ${day}: Sudoku Challenge`,
        storyText: `Halfway through the first week! Solve this festive sudoku puzzle.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/sudoku-day-5.html`, // Interactive sudoku puzzle for day 5
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
        doorImageUrl: `/5.svg`,
      }
    }

    // Day 6 uses the PuzzleMe sudoku embed
    if (day === 6) {
      return {
        day,
        title: `Day ${day}: Sudoku Challenge`,
        storyText: `Keep up the festive spirit! Solve this sudoku puzzle.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/sudoku-day-6.html`, // Interactive sudoku puzzle for day 6
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
        doorImageUrl: `/6.svg`,
      }
    }

    // Day 7 uses the PuzzleMe sudoku embed
    if (day === 7) {
      return {
        day,
        title: `Day ${day}: Sudoku Challenge`,
        storyText: `One week down! Solve this festive sudoku puzzle.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/sudoku-day-7.html`, // Interactive sudoku puzzle for day 7
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
        doorImageUrl: `/7.svg`,
      }
    }

    // Day 8 uses the PuzzleMe sudoku embed
    if (day === 8) {
      return {
        day,
        title: `Day ${day}: Sudoku Challenge`,
        storyText: `Keep the festive puzzle solving going! Solve this sudoku challenge.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/sudoku-day-8.html`, // Interactive sudoku puzzle for day 8
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
        doorImageUrl: `/8.svg`,
      }
    }

    // Day 9 uses the PuzzleMe sudoku embed
    if (day === 9) {
      return {
        day,
        title: `Day ${day}: Sudoku Challenge`,
        storyText: `You're doing great! Solve this festive sudoku puzzle.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/sudoku-day-9.html`, // Interactive sudoku puzzle for day 9
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
        doorImageUrl: `/9.svg`,
      }
    }

    // Day 10 uses the PuzzleMe sudoku embed
    if (day === 10) {
      return {
        day,
        title: `Day ${day}: Sudoku Challenge`,
        storyText: `Double digits! You're making fantastic progress. Solve this festive sudoku puzzle.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/sudoku-day-10.html`, // Interactive sudoku puzzle for day 10
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
        doorImageUrl: `/images/doors/door-${day}.svg`,
      }
    }

    // Day 11 uses the PuzzleMe sudoku embed
    if (day === 11) {
      return {
        day,
        title: `Day ${day}: Sudoku Challenge`,
        storyText: `Keep the festive puzzle solving momentum going! Solve this sudoku challenge.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/sudoku-day-11.html`, // Interactive sudoku puzzle for day 11
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
        doorImageUrl: `/images/doors/door-${day}.svg`,
      }
    }

    // Day 12 uses the PuzzleMe sudoku embed
    if (day === 12) {
      return {
        day,
        title: `Day ${day}: Sudoku Challenge`,
        storyText: `Halfway through your advent journey! Solve this festive sudoku puzzle.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/sudoku-day-12.html`, // Interactive sudoku puzzle for day 12
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
        doorImageUrl: `/images/doors/door-${day}.svg`,
      }
    }

    // Day 13 uses the PuzzleMe sudoku embed
    if (day === 13) {
      return {
        day,
        title: `Day ${day}: Sudoku Challenge`,
        storyText: `You're past the halfway point! Solve this festive sudoku puzzle.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/sudoku-day-13.html`, // Interactive sudoku puzzle for day 13
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
        doorImageUrl: `/images/doors/door-${day}.svg`,
      }
    }

    // Day 14 uses the PuzzleMe sudoku embed
    if (day === 14) {
      return {
        day,
        title: `Day ${day}: Sudoku Challenge`,
        storyText: `Two weeks of festive puzzle solving! Solve this sudoku challenge.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/sudoku-day-14.html`, // Interactive sudoku puzzle for day 14
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
        doorImageUrl: `/images/doors/door-${day}.svg`,
      }
    }

    // Day 15 uses the PuzzleMe sudoku embed
    if (day === 15) {
      return {
        day,
        title: `Day ${day}: Sudoku Challenge`,
        storyText: `You're in the final stretch! Solve this festive sudoku puzzle.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/sudoku-day-15.html`, // Interactive sudoku puzzle for day 15
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
        doorImageUrl: `/images/doors/door-${day}.svg`,
      }
    }

    // Day 16 uses the PuzzleMe sudoku embed
    if (day === 16) {
      return {
        day,
        title: `Day ${day}: Sudoku Challenge`,
        storyText: `Only 8 days left! Keep up the festive puzzle solving.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/sudoku-day-16.html`, // Interactive sudoku puzzle for day 16
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
        doorImageUrl: `/images/doors/door-${day}.svg`,
      }
    }

    // Day 17 uses the PuzzleMe sudoku embed
    if (day === 17) {
      return {
        day,
        title: `Day ${day}: Sudoku Challenge`,
        storyText: `You're almost there! Solve this festive sudoku puzzle.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/sudoku-day-17.html`, // Interactive sudoku puzzle for day 17
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
        doorImageUrl: `/images/doors/door-${day}.svg`,
      }
    }

    // Day 18 uses the PuzzleMe sudoku embed
    if (day === 18) {
      return {
        day,
        title: `Day ${day}: Sudoku Challenge`,
        storyText: `Only 6 days to go! Solve this festive sudoku puzzle.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/sudoku-day-18.html`, // Interactive sudoku puzzle for day 18
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
        doorImageUrl: `/images/doors/door-${day}.svg`,
      }
    }

    // Day 19 uses the PuzzleMe sudoku embed
    if (day === 19) {
      return {
        day,
        title: `Day ${day}: Sudoku Challenge`,
        storyText: `Almost at the finish line! Solve this festive sudoku puzzle.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/sudoku-day-19.html`, // Interactive sudoku puzzle for day 19
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
        doorImageUrl: `/images/doors/door-${day}.svg`,
      }
    }

    // Day 20 uses the PuzzleMe sudoku embed
    if (day === 20) {
      return {
        day,
        title: `Day ${day}: Sudoku Challenge`,
        storyText: `Only 4 days remaining! Solve this festive sudoku puzzle.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/sudoku-day-20.html`, // Interactive sudoku puzzle for day 20
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
        doorImageUrl: `/images/doors/door-${day}.svg`,
      }
    }

    // Day 21 uses the PuzzleMe sudoku embed
    if (day === 21) {
      return {
        day,
        title: `Day ${day}: Sudoku Challenge`,
        storyText: `Just 3 days left! Solve this festive sudoku puzzle.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/sudoku-day-21.html`, // Interactive sudoku puzzle for day 21
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
        doorImageUrl: `/images/doors/door-${day}.svg`,
      }
    }

    // Day 22 uses the PuzzleMe sudoku embed
    if (day === 22) {
      return {
        day,
        title: `Day ${day}: Sudoku Challenge`,
        storyText: `Only 2 days to go! Solve this festive sudoku puzzle.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/sudoku-day-22.html`, // Interactive sudoku puzzle for day 22
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
        doorImageUrl: `/images/doors/door-${day}.svg`,
      }
    }

    // Day 23 uses the PuzzleMe sudoku embed
    if (day === 23) {
      return {
        day,
        title: `Day ${day}: Sudoku Challenge`,
        storyText: `One final day after this! Solve this festive sudoku puzzle.`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/sudoku-day-23.html`, // Interactive sudoku puzzle for day 23
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
        doorImageUrl: `/images/doors/door-${day}.svg`,
      }
    }

    // Day 24 uses the PuzzleMe sudoku embed
    if (day === 24) {
      return {
        day,
        title: `Day ${day}: Sudoku Challenge`,
        storyText: `The final puzzle! Congratulations on completing your festive sudoku journey!`,
        illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`, // Fallback if iframe doesn't load
        interactiveUrl: `/games/sudoku-day-24.html`, // Interactive sudoku puzzle for day 24
        clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
        doorImageUrl: `/images/doors/door-${day}.svg`,
      }
    }

    return {
      day,
      title: `Day ${day}: Sudoku Challenge`,
      storyText: `This is placeholder text for Day ${day}. Replace this with your custom story content, clues, and narrative for A Very Sudoku Christmas.`,
      illustrationUrl: `/placeholder.svg?height=400&width=600&query=sudoku Christmas illustration day ${day}`,
      clueCardUrl: `/placeholder.svg?height=300&width=400&query=sudoku clue card day ${day}`,
      doorImageUrl: `/images/doors/door-${day}.svg`,
      puzzle:
        day % 3 === 0
          ? {
              type: "reveal",
              revealText: "Tap to reveal the hidden sudoku clue...",
            }
          : undefined,
    }
  })
}

// Store all calendar data
const calendarData: CalendarData = {
  "murder-mistletoe-manor": generateMistletoeManorData(),
  "christmas-conspiracy": generateChristmasConspiracyData(),
  "a-very-sudoku-christmas": generateSudokuChristmasData(),
}

export function getDayContent(day: number, calendarId: string): DayContent | undefined {
  const data = calendarData[calendarId]
  if (!data) {
    console.warn(`[v0] No data found for calendar: ${calendarId}`)
    return undefined
  }
  return data.find((d) => d.day === day)
}

// Export data for direct access if needed
export function getCalendarData(calendarId: string): DayContent[] {
  return calendarData[calendarId] || []
}

export function isDayUnlocked(day: number, unlockAllOverride = false): boolean {
  // If unlock all is enabled, all doors are unlocked
  if (unlockAllOverride) {
    return true
  }

  // Get current time in UTC
  const now = new Date()

  // Create unlock date for this door: 2025-12-{day} 06:00:00 UTC
  const unlockDate = new Date(Date.UTC(2025, 11, day, 6, 0, 0)) // Month is 0-indexed, so 11 = December

  // Door is unlocked if current UTC time >= unlock time
  return now >= unlockDate
}

export function getTimeUntilUnlock(day: number): { days: number; hours: number; minutes: number } | null {
  // Get current time in UTC
  const now = new Date()

  // Create unlock date for this door: 2025-12-{day} 06:00:00 UTC
  const unlockDate = new Date(Date.UTC(2025, 11, day, 6, 0, 0))

  // If already unlocked, return null
  if (now >= unlockDate) {
    return null
  }

  // Calculate difference in milliseconds
  const diffMs = unlockDate.getTime() - now.getTime()

  // Convert to days, hours, minutes
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

  return { days, hours, minutes }
}
