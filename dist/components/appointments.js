"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const Appointments = () => {
    const [appointments, setAppointments] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios_1.default.get('/appointments');
                setAppointments(response.data);
            }
            catch (error) {
                console.error(error);
            }
        };
        fetchAppointments();
    }, []); // Empty dependency array means this effect will run once, similar to componentDidMount
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "Appointments"),
        react_1.default.createElement("ul", null, appointments.map((appointment) => (react_1.default.createElement("li", { key: appointment.id }, `ID: ${appointment.id}, Start Time: ${appointment.start_time}, End Time: ${appointment.end_time}, Staff ID: ${appointment.staff_id}, Client ID: ${appointment.client_id}`))))));
};
exports.default = Appointments;
