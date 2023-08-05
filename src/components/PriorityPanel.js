import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Select } from '@mui/material';
import DraggableList from './DraggableList';
import './PriorityPanel.css';
export default function PriorityPanel(props) {
    const Priorities = ['A', 'B', 'C', 'D', 'E'];
    const prorityChart = {
        'SR3':{
            "raceBonuses":{
                "Human":{ 'Body':0,'Quickness':0,'Strength':0,'Charisma':0,'Willpower':0,'Intelligence':0,"Notes":""},
                "Dwarf":{'Body':1,'Quickness':0,'Strength':2,'Charisma':0,'Willpower':0,'Intelligence':0,"Notes":"Thermographic Vision, Resistance (+2 Body) to any disease or toxin"},
                "Elf":{'Body':0,'Quickness':1,'Strength':0,'Charisma':2,'Willpower':0,'Intelligence':0,"Notes":"Low-light Vision"},
                "Ork":{'Body':3,'Quickness':0,'Strength':2,'Charisma':-1,'Willpower':0,'Intelligence':-1,"Notes":"Low-light Vision"},
                "Troll":{'Body':5,'Quickness':-1,'Strength':4,'Charisma':0,'Willpower':0,'Intelligence':-2,"Notes":"Thermographic Vision, +1 Reach for Armed/Unarmed Combat, Dermal Armor (+1 Body)"}
            },
            "race": {
                    "A":['N/A'], 
                    "B":['N/A'], 
                    "C":['Troll','Elf'], 
                    "D":['Dwarf','Ork'],
                    "E":['Human'],
                },
            "magic": {
                "A":["Full Magician"],
                "B":['Physical Adept',"Aspected"],
                "C":['None'],
                "D":['None'],
                "E":['None']
            },
            "attributes":   {"A":30,     "B":27,    "C":24,   "D":21,   "E":18},
            "skills":       {"A":50,     "B":40,    "C":34,   "D":30,   "E":27},
            "resources":    {
                                "A":{"nuyen":1000000, "spell_points":50},
                                "B":{"nuyen":400000, "spell_points":35},
                                "C":{"nuyen":90000, "spell_points":25},
                                "D":{"nuyen":20000, "spell_points":15},
                                "E":{"nuyen":5000, "spell_points":5} 
                            }
                            
        },
        'SR2':{
            "raceBonuses":{
                "Human":{ 'Body':0,'Quickness':0,'Strength':0,'Charisma':0,'Willpower':0,'Intelligence':0,"Notes":""},
                "Dwarf":{'Body':1,'Quickness':-1,'Strength':2,'Charisma':0,'Willpower':1,'Intelligence':0,"Notes":"Thermographic Vision, Resistance (+2 Body) to any disease or toxin"},
                "Elf":{'Body':0,'Quickness':1,'Strength':0,'Charisma':2,'Willpower':0,'Intelligence':0,"Notes":"Low-light Vision"},
                "Ork":{'Body':3,'Quickness':-1,'Strength':2,'Charisma':-1,'Willpower':-1,'Intelligence':-1,"Notes":"Low-light Vision"},
                "troll":{'Body':5,'Quickness':-1,'Strength':4,'Charisma':-2,'Willpower':-1,'Intelligence':-2,"Notes":"Thermographic Vision, +1 Reach for Armed/Unarmed Combat, Dermal Armor (+1 Body)"}
            },
            "race": {
                "A":['Troll','Ork','Dwarf','Elf','Human'], 
                "B":['Human'], 
                "C":['Human'], 
                "D":['Human'],
                "E":['Human'],
            },
        "magic": {
                "A":["Human Full Magician"],
                "B":['Metahuman Full Magician','Human Physical Adept',"Human Shamanist","Human Sorcerer"],
                "C":['Metahuman Physical Adept',"Metahuman Shamanist"," Metahuman Sorcerer"],
                "D":['None'],
                "E":['None']
            },
            "attributes":   { "A":30, "B":24, "C":20, "D":17, "E":15},
            "skills":       { "A":40, "B":30, "C":24, "D":20, "E":17},
            "resources": {
                    "A":{"nuyen":1000000, "spell_points":50},
                    "B":{"nuyen":400000, "spell_points":35},
                    "C":{"nuyen":90000, "spell_points":25},
                    "D":{"nuyen":5000, "spell_points":15},
                    "E":{"nuyen":500, "spell_points":5} 
            }
        }
    }
    const propertiesToOrderedList = (priorities) => {
        let templist = [];
        let finalArrayOfObjects = [];
        for (var pri in priorities) {
            templist.push([pri, priorities[pri]]);
        }
        templist.forEach(function(key) {
            finalArrayOfObjects.push({'name':key[0],'id':key[0]});
        });
        return finalArrayOfObjects;
    }

    const [priorities, setPriorities] = React.useState(propertiesToOrderedList(props.CharacterPriorities));
    const [PriorityRace, setPriorityRace] = React.useState(props.CharacterPriorities.Race);
    const [AvailableRaces, setAvailableRaces] = React.useState([...prorityChart[props.Edition].race[PriorityRace]]);
    const [AvailableMagics, setAvailableMagics] = React.useState([...prorityChart[props.Edition].magic[PriorityRace]]);
    const [Race, setRace] = React.useState(['Human']);
    const [Magic, setMagic] = React.useState(props.magicalChoice??'None');

    const handleMagicChange = (magic) => {
        setMagic(magic.target.value);
        props.ChangeMagic(magic.target.value);
    }

    const handleChangePriorityMagic = (newPriority) => {
        const newPriorityMagic = newPriority;
        setAvailableMagics(prorityChart[props.Edition].magic[newPriorityMagic]);
        if(prorityChart[props.Edition].magic[newPriorityMagic][0] !== 'Full Magician' || prorityChart[props.Edition].magic[newPriorityMagic][0] !== 'Physical Adept, Aspected'){
            setMagic('None') 
        }else{
            setMagic(prorityChart[props.Edition].magic[newPriorityMagic][0])
        }
        
        props.ChangeMagicChoices(prorityChart[props.Edition].magic[newPriorityMagic]);
        props.ChangeMagic(prorityChart[props.Edition].magic[newPriorityMagic][0])
    };

    const handleRaceChange = (race) => {
        setRace(race.target.value);
        props.ChangeRace(race.target.value);
        props.ChangeRaceBonuses(prorityChart[props.Edition].raceBonuses[race.target.value]);
    }

    const handleChangePriorityRace = (newPriority) => {
        const newPriorityRace = newPriority;
        setPriorityRace(newPriorityRace);
        setAvailableRaces(prorityChart[props.Edition].race[newPriorityRace]);
        setRace(prorityChart[props.Edition].race[newPriorityRace][0])
        props.ChangeRaceChoices(prorityChart[props.Edition].race[newPriorityRace]);
    };
    
    const handleChangePriorityAttributes = (newPriority) => {
        const newPriorityAttributes = newPriority;
        props.ChangeMaxAttributes(prorityChart[props.Edition].attributes[newPriorityAttributes]);
    };
    
    const handleChangePrioritySkills = (newPriority) => {
        const newPrioritySkills = newPriority;
        props.ChangeMaxSkills(prorityChart[props.Edition].skills[newPrioritySkills]);
    };
    
    const handleChangePriorityResources = (newPriority) => {
        const newPriorityResources = newPriority;
        props.ChangeMaxCash(prorityChart[props.Edition].resources[newPriorityResources].nuyen);
    };


    const TableRender = function (edition){
        return (
            <table className="">
                <thead>
                    <tr>
                        <th style={{width:'100px'}}>Priority</th>
                        <th>Race</th>
                        <th style={{width:"310px"}}>Magic</th>
                        <th>Attributes</th>
                        <th>Skills</th>
                        <th>Resources</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Priorities.map((letter)=>{
                            return (
                                <tr key={letter}>
                                    <td>{letter}</td>
                                    <td className={props.CharacterPriorities.Race === letter ? 'highlighted':''}><label>{prorityChart[props.Edition]['race'][letter].join(', ')}</label></td>
                                    <td className={props.CharacterPriorities.Magic === letter ? 'highlighted':''}><label>{prorityChart[props.Edition]['magic'][letter].join(', ')}</label></td>
                                    <td className={props.CharacterPriorities.Attributes === letter ? 'highlighted':''}><label>{prorityChart[props.Edition]['attributes'][letter]}</label></td>
                                    <td className={props.CharacterPriorities.Skills === letter ? 'highlighted':''}><label>{prorityChart[props.Edition]['skills'][letter]}</label></td>
                                    <td className={props.CharacterPriorities.Resources === letter ? 'highlighted':''}><label>{new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(prorityChart[props.Edition]['resources'][letter]['nuyen'])}</label></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const onDragEnd = ({ destination, source }) => {
        // dropped outside the list
        if (!destination) return;
        const newItems = reorder(priorities, source.index, destination.index);
        setPriorities(newItems);
        let propertiesOrder = {0:'A',1:'B',2:'C',3:'D',4:'E'};
        let tempPriorities = {};
        for (let i = 0; i < newItems.length; i++) {
            switch(newItems[i].name) {
                case 'Race':
                    handleChangePriorityRace(propertiesOrder[i]);
                    tempPriorities.Race = propertiesOrder[i];
                break;
                case 'Magic':
                    handleChangePriorityMagic(propertiesOrder[i]);
                    tempPriorities.Magic = propertiesOrder[i];
                break
                case 'Skills':
                    handleChangePrioritySkills(propertiesOrder[i]);
                    tempPriorities.Skills = propertiesOrder[i];
                break;
                case 'Attributes':
                    handleChangePriorityAttributes(propertiesOrder[i]);
                    tempPriorities.Attributes = propertiesOrder[i];
                break;
                case 'Resources':
                    handleChangePriorityResources(propertiesOrder[i]);
                    tempPriorities.Resources = propertiesOrder[i];
                break;

                default:
                    console.log("Something bad  ! " + newItems[i].name);
                break;
            }
        }
        props.ChangePriorities(tempPriorities);
    };

    return (
        <div>
            <h2>MASTER CHARACTER CREATION TABLE</h2>             
            { TableRender() }
            <DraggableList items={priorities} onDragEnd={onDragEnd} />
            <hr></hr>
            <h4>Character Sub Choices</h4>
            <FormControl fullWidth>
                <InputLabel id="race-select-label">Race</InputLabel>
                <Select
                    id="race-select"
                    value={Race}
                    label="race"
                    onChange={handleRaceChange}
                >{
                    AvailableRaces.map((race) => {
                        return (<MenuItem key={race} value={race}>{race}</MenuItem>)
                    })
                }
                </Select>
            </FormControl>
            <br></br><br></br>
            <FormControl fullWidth>
                <InputLabel id="race-select-label">Magic</InputLabel>
                <Select
                    id="magic-select"
                    value={Magic}
                    label="magic"
                    onChange={handleMagicChange}
                >{
                    AvailableMagics.map((magic) => {
                        return (<MenuItem key={magic} value={magic}>{magic}</MenuItem>)
                    })
                }
                </Select>
            </FormControl>
        </div>
  );
}