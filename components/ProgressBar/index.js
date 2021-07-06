import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProgressBar = ({
  title,
  high,
  low,
  avg,
  value,
  className,
  suffix,
  prefix,
}) => {
  const range = high - low;

  const relativeValue = Number(value) - low;
  const reltativeAvg = Number(avg) - low;
  let avgPosition = (reltativeAvg / range) * 100;
  let bikePosition = (relativeValue / range) * 100;

  if (range === 0) {
    avgPosition = 50;
    bikePosition = 50;
  }

  return (
    <div className={`relative pt-1 w-full ${className}`}>
      <h4 className="font-black text-xs uppercase tracking-wider ">{title}</h4>

      <div className="bg-white rounded border border-gray-300 px-6 pt-7 pb-0">
        <div className="relative ">
          <div
            className="absolute block left-0 -top-6 text-right h-4 mt-6 px-1"
            style={{ width: `${bikePosition}%` }}
          >
            <span
              className={`text-center absolute -top-7 w-6 text-3xl -right-3  text-black ${
                bikePosition > 66
                  ? 'text-green-500'
                  : bikePosition < 33
                  ? 'text-red-500'
                  : 'text-yellow-500'
              }`}
            >
              <FontAwesomeIcon icon="caret-down" />
            </span>
          </div>
          {avg && (
            <div
              className="absolute block left-0 -top-6 text-right border-r-2 border-gray-500 h-3 mt-6 px-1"
              style={{ width: `${avgPosition}%` }}
            >
              <span className="text-xs text-center absolute top-3 w-8 -right-4 uppercase text-black block bg-white opacity-40">
                Avg
              </span>
            </div>
          )}

          <div className="overflow-hidden h-2 text-xs flex rounded bg-gradient-to-r from-red-400 via-yellow-400 to-green-400" />
          <div className="flex mb-2 items-center justify-between">
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-red-500">
                {prefix}
                {low}
                {suffix}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-green-500">
                {prefix}
                {high}
                {suffix}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
