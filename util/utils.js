const meetNameArray = [
  "MD Intrasquad Time Trials", "Huntington Beach/Woodbridge", "Capo Valley Relays Girls Prelims",
  "Capo Valley Relays Boys Prelims", "Capo Valley Relays Finals", "Capo Valley Dive Invite", "Tesoro", "JSerra",
  "Mission Viejo Diving Invitational", "Mission Viejo Swimming Invitational (Prelims)",
  "Mission Viejo Swimming Invitational (Finals)", "St. John Bosco", "OC Frosh/Soph Invite Prelims",
  "OC Frosh/Soph Invite Finals", "Orange Lutheran", "Santa Margarita Diving Invite", "Santa Margarita",
  "Catholic Invite", "Servite/Rosary", "Trinity League Girls Prelims", "Trinity League Boys Prelims",
  "Trinity League Coed Diving Finals", "Trinity League Coed Finals", "CIF-SS Diving", "CIF-SS (Prelims)",
  "CIF State Diving Qualifier", "CIF-SS (Finals)", "State (Prelims)", "State (Finals)"
];

const DataUtils = {

numMeets: meetNameArray.length,

// Makes an array of empty strings of length <however many meets there are in a season>.
makeNewSwimmerTimesArray: function() {
  return Array.from(meetNameArray, _ => "");
},

// Returns the array of meet names in order, likely to be used in rendering the top row of the times results
getMeetNamesArray: function() {
  return meetNameArray;
},

// Returns a stroke name that can be displayed (i.e. in a times table) based on
// the short name (i.e. the object member for a swimmer)
getStrokeProperName: function(stroke, fullname) {
  switch (stroke) {
    case 'back':
      return fullname ? 'Backstroke' : 'Back';
    case 'breast':
      return fullname ? 'Breaststroke' : 'Breast';
    case 'fly':
      return fullname ? 'Butterfly' : 'Fly';
    case 'free':
      return fullname ? 'Freestyle' : 'Free';
    case 'im':
    case 'medley':
      return 'IM';
    default:
      // Don't want the program to die because of this, so just let them find
      // the inconsistency.
      return stroke;
  }
},

// This comes up too often
lenPropToInt: function(lenProp) {
  switch (lenProp) {
    case 'len50': return 50;
    case 'len100': return 100;
    case 'len200': return 200;
    case 'len500': return 500;
    default: return -1;
  }
},

// Build up the times array that will be passed to the EJS. Pass it as a
// list of objects, each containing the event name and the list of
// times.
// From a swimmer's `times` object, construct a formatted array of time entries
// that will be passed to the EJS.
// The times object is formatted as:
/*
  {
    len50, len100, len200, len500: {
      fly, back, breast, free, medley: [str] | null
    }
  }
 */
// The array will be of the form:
/*
  [
    {
      eventName: "50 Free | 100 Fly | etc.",
      eventTimes: [the swimmer's list of times, if they exist]
    }
  ]
 */
makeEventsArrForRender: function(swimmerObj) {
  if (!swimmerObj) {
    console.warn("makeTimesArrForRender got a falsy swimmerObj");
    return [];
  }

  let timeObj = swimmerObj.times;
  if (!timeObj) {
    console.warn("makeTimesArrForRender got a swimmer with a falsy 'times' member");
    return [];
  }

  let retArr = [];
  for (let strokeLen of swimmerObj.lengths) {
    let curLen = this.lenPropToInt(strokeLen);
    console.debug(`strokeLen: ${strokeLen}`);
    for (let stroke of swimmerObj.strokes) {
      let curStroke = this.getStrokeProperName(stroke);
      console.debug(`stroke: ${stroke}`);
      let timesList = timeObj[strokeLen][stroke];
      if (!timesList) continue;
      retArr.push({
        eventName: `${curLen} ${curStroke}`,
        eventTimes: Array.from(timesList, time => time ? time : "&mdash;")
      });
    }
  }
  return retArr;
},

};

module.exports = DataUtils;
