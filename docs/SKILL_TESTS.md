# The Music of Erich Zann — Skill Tests Reference

---

## Stats Overview

| Stat | Generation | Purpose |
|---|---|---|
| **Perception** | 1d6+6 | Investigative sharpness, noticing details |
| **Sanity** | 2d6+12 | Mental fortitude — depletes with cosmic exposure |
| **Luck** | 1d6+6 | Fortune (same mechanic as Hawksmoor) |

---

## Act 1: The Rue d'Auseil

| Scene | Test | Type | Trigger Choice | Success | Failure |
|---|---|---|---|---|---|
| **1.2 The Street** | Perception | Deferred | A: "Try to fix the route in your memory" | `rue_memory +1` — You could retrace the route. You think. | Street resists mapping; details drain away as you note them. |
| **1.3 Blandot's House** | Luck | Immediate | All three choices (A/B/C) | Fifth floor room (one below Zann). `dread +1`. Choice B also gets Zann's name early. | Third floor room. Further from the garret; won't discover what's above until the music wakes you. |
| **1.5 The First Night** | Perception | Deferred | A: "Listen carefully — try to understand" | `knowledge +1` — Music is a *conversation*; the viol speaks, and something answers. | Music's deeper nature eludes you; you hear only the surface. |
| **1.7 The Overture** | Sanity | Immediate | A: "Knock on the door" / B: "Listen from the landing" | Mind holds. Rattled but not broken — senses scraped clean. | `sanity -2`. Music breaches composure. Trembling, vision swimming, hairline crack in mental glass. Choice C ("Retreat") bypasses the test entirely. |

### Notes on Act 1 Tests
- **Deferred tests** (Perception 1.2, 1.5): Result is shown immediately but the bonus is applied silently — no stat penalty on failure, only a missed bonus.
- **Immediate tests** (Luck 1.3, Sanity 1.7): Results have tangible narrative consequences. Luck determines your floor (and proximity to Zann). Sanity failure costs 2 points and produces physical symptoms.
- Choice 1.7C is the only "safe" path through the Overture — no test, no risk, but also no close encounter with Zann's door.

---

## Act 2: The Viol's Secret (Planned)

| Scene | Test | Type | Purpose |
|---|---|---|---|
| **2.2 The Other Tenants** | Perception | Deferred | Noticing details about other residents; bonus to `knowledge` |
| **2.4 The Garret** | Perception | Deferred | Examining Zann's room; bonus to `knowledge` |
| **2.5 The Performance** | Sanity | Immediate | Enduring Zann's private performance; failure costs `sanity` |
| **2.6 The Window** | Sanity | Immediate | Looking beyond the window; failure costs `sanity`, may set `knows_void` |
| **2.8 The Street at Night** | Luck | Immediate | Navigating the Rue d'Auseil at night; determines encounters |
| **2.9 The Viol** | *Mini-game* | Special | Pattern-matching viol game; sets `played_viol` |
| **2.10 What Answers** | Sanity | Immediate | Witnessing the void's response; high stakes sanity test |

---

## Act 3: The Music of the Void (Planned)

| Scene | Test | Type | Purpose |
|---|---|---|---|
| **3.1 The Last Evening** | Perception | Deferred | Sensing what's different tonight |
| **3.2 The Storm** | Luck | Immediate | Surviving the unnatural storm |
| **3.3 The Garret Door** | Sanity | Immediate | Reaching Zann during his most desperate playing |
| **3.4 The Window Opens** | Sanity | Immediate | Confronting the void directly; highest stakes |
| **3.5 The Music Breaks** | Variable | Branching | Test depends on player's chosen action — Perception (play viol), Luck (hold window), or none (grab manuscript and run) |

---

## Ending Conditions

| Ending | Key State Requirements |
|---|---|
| **A: The Pages on the Wind** (Canonical) | Default path; low `played_viol`, moderate `knowledge` |
| **B: The New Player** | High `played_viol`, high `zann_trust`, moderate+ `knowledge`, `sanity > threshold` |
| **C: The Void Enters** | High `dread`, low `sanity`, `knows_void ≥ 1`, failed key Luck tests |
| **D: The Sealed Window** | High `knowledge`, `has_manuscript ≥ 1`, `window_sealed ≥ 1`, good `luck` |
| **E: The Music of the Spheres** | Very high `knowledge`, high `perception`, `played_viol ≥ 1`, `sanity > threshold`, looked into void willingly |

---

## State Variables Affected by Skill Tests

| Variable | Modified By | Effect on Game |
|---|---|---|
| `rue_memory` | Perception 1.2 success | Affects ability to find the street again (endings) |
| `knowledge` | Perception 1.5, 2.2, 2.4 success; choice effects | Unlocks endings D and E; affects what Zann reveals |
| `sanity` | Sanity test failures (1.7, 2.5, 2.6, 2.10, 3.3, 3.4) | Below threshold locks out endings B and E; very low triggers ending C |
| `dread` | Luck 1.3 success; various choice effects | High dread triggers ending C; affects available choices |
| `played_viol` | Mini-game 2.9 | Required for endings B and E |
| `knows_void` | Sanity 2.6 (looking through window) | Required for ending C; contributes to ending E |
| `zann_trust` | Choice effects (1.6, 1.8) | Affects what Zann reveals in Act 2; required high for ending B |
